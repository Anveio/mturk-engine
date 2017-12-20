import { Map } from 'immutable';
import { SearchResult, SearchResults } from '../types';
import {
  WorkerSearchResult,
  SearchResultsApiResponse,
  WorkerQualification
} from '../worker-mturk-api';
import { parseReactProps } from './parsing';
import { mturkTableDataNodeQuerySelector } from '../constants/querySelectors';

export const parseWorkerSearchPage = (
  html: Document,
  freshSearch?: boolean
): SearchResults => {
  const workerHits = searchResultsDocumentToWorkerHitArray(html);
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
  creationTime: new Date(hit.creation_time).valueOf(),
  lastUpdatedTime: new Date(hit.last_updated_time).valueOf(),
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
  reward: hit.monetary_reward.amount_in_dollars,
  canPreview: hit.caller_meets_preview_requirements
});

const searchResultsDocumentToWorkerHitArray = (
  html: Document
): WorkerSearchResult[] => {
  const pageReactProps = parseReactProps(html)(mturkTableDataNodeQuerySelector);

  try {
    const searchResultsData = JSON.parse(
      pageReactProps
    ) as SearchResultsApiResponse;
    return searchResultsData.bodyData;
  } catch (e) {
    console.warn(e);
    return [];
  }
};

const calculateIfQualified = (qualificationsArray: WorkerQualification[]) =>
  qualificationsArray.every(qual => !!qual.caller_meets_requirement);
