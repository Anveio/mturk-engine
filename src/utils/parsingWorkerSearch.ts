import { Map } from 'immutable';
import { SearchResult, SearchResults, TaskQualification } from '../types';
import { WorkerSearchResult, WorkerQualification } from '../worker-mturk-api';

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

const calculateIfQualified = (qualificationsArray: WorkerQualification[]) =>
  qualificationsArray.every(qual => !!qual.caller_meets_requirement);

const transformProjectRequirements = (
  quals: WorkerQualification[]
): TaskQualification[] =>
  quals.map((qual): TaskQualification => ({
    qualificationId: qual.qualification_type_id,
    name: qual.qualification_type.name,
    description: qual.qualification_type.description,
    comparator: qual.comparator,
    hasTest: qual.qualification_type.has_test,
    requestable: qual.qualification_type.is_requestable,
    userValue: qual.caller_qualification_value.integerValue,
    qualificationValues: qual.qualification_values
  }));
