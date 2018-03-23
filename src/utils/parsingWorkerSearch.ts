import { Map } from 'immutable';
import { SearchResult, SearchResults } from '../types';
import { WorkerSearchResult } from '../worker-mturk-api';
import {
  calculateIfQualified,
  transformProjectRequirements
} from './qualifications';

export const tabulateSearchData = (
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
  qualsRequired: transformProjectRequirements(hit.project_requirements),
  requester: {
    id: hit.requester_id,
    name: hit.requester_name
  },
  timeAllottedInSeconds: hit.assignment_duration_in_seconds,
  reward: hit.monetary_reward.amount_in_dollars,
  canPreview: hit.caller_meets_preview_requirements
});
