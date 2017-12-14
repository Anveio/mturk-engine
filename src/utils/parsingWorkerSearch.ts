import { Map } from 'immutable';
import { SearchResult, SearchResults } from '../types';
import { WorkerHit, SearchResultsApiResponse } from '../worker-mturk-api';

export const parseWorkerSearchPage = (
  html: Document,
  freshSearch?: boolean
): SearchResults => {
  const workerHits = searchResultsDocumentToWorkerHitArray(html);
  console.log(workerHits);
  return tabulateSearchData(workerHits, freshSearch);
};

const tabulateSearchData = (
  input: WorkerHit[],
  freshSearch?: boolean
): SearchResults =>
  input.reduce(
    (map: SearchResults, hit: WorkerHit) =>
      map.set(hit.hit_set_id, {
        ...createWorkerSearchItem(hit),
        markedAsRead: !!freshSearch
      }),
    Map<string, SearchResult>()
  );

const createWorkerSearchItem = (hit: WorkerHit): SearchResult => ({
  title: hit.title,
  batchSize: hit.assignable_hits_count,
  description: hit.description,
  groupId: hit.hit_set_id,
  qualified: hit.caller_meets_preview_requirements,
  qualsRequired: hit.project_requirements,
  requester: {
    id: hit.requester_id,
    name: hit.requester_name
  },
  timeAllottedInSeconds: hit.assignment_duration_in_seconds,
  reward: hit.monetary_reward.amount_in_dollars
});

const searchResultsDocumentToWorkerHitArray = (html: Document): WorkerHit[] => {
  const searchResultsDataNode = html.querySelector(
    'div.row.m-b-md > div.col-xs-12 > div'
  ) as Element;
  const searchResultsDataString = searchResultsDataNode.getAttribute(
    'data-react-props'
  ) as string;
  const searchResultsData = JSON.parse(
    searchResultsDataString
  ) as SearchResultsApiResponse;
  return searchResultsData.bodyData;
};
