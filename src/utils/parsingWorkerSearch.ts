import { Map } from 'immutable';
import { SearchResult, SearchResults } from '../types';
import {
  WorkerSearchResult,
  SearchResultsApiResponse,
  WorkerQualification
} from '../worker-mturk-api';

export const parseWorkerSearchPage = (
  html: Document,
  freshSearch?: boolean
): SearchResults => {
  const workerHits = searchResultsDocumentToWorkerHitArray(html);
  workerHits.map(hit =>
    hit.project_requirements.map(qual => console.log(qual.comparator))
  );
  return tabulateSearchData(workerHits, freshSearch);
};

const tabulateSearchData = (
  input: WorkerSearchResult[],
  freshSearch?: boolean
): SearchResults =>
  input.reduce(
    (map: SearchResults, hit: WorkerSearchResult) =>
      map.set(hit.hit_set_id, {
        ...createWorkerSearchItem(hit),
        markedAsRead: !!freshSearch
      }),
    Map<string, SearchResult>()
  );

const createWorkerSearchItem = (hit: WorkerSearchResult): SearchResult => ({
  title: hit.title,
  creationTime: new Date(hit.creation_time),
  lastUpdatedTime: new Date(hit.last_updated_time),
  batchSize: hit.assignable_hits_count,
  description: hit.description,
  groupId: hit.hit_set_id,
  qualified: calculateIfQualified(hit.project_requirements),
  qualsRequired: hit.project_requirements,
  requester: {
    id: hit.requester_id,
    name: hit.requester_name
  },
  timeAllottedInSeconds: hit.assignment_duration_in_seconds,
  reward: hit.monetary_reward.amount_in_dollars
});

const searchResultsDocumentToWorkerHitArray = (
  html: Document
): WorkerSearchResult[] => {
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

const calculateIfQualified = (qualificationsArray: WorkerQualification[]) =>
  qualificationsArray.every(qual => !!qual.caller_meets_requirement);
