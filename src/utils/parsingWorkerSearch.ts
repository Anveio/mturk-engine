import { Map } from 'immutable';
import { SearchResult, SearchResults, WorkerQualification } from '../types';
import {
  WorkerSearchResult,
  WorkerApiQualification
} from '../worker-mturk-api';

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

const calculateIfQualified = (qualificationsArray: WorkerApiQualification[]) =>
  qualificationsArray.every(qual => !!qual.caller_meets_requirement);

const transformProjectRequirements = (
  quals: WorkerApiQualification[]
): WorkerQualification[] =>
  quals.map((qual): WorkerQualification => ({
    qualificationId: qual.qualification_type_id,
    name: qual.qualification_type.name,
    description: qual.qualification_type.description,
    comparator: qual.comparator,
    hasTest: qual.qualification_type.has_test,
    requestable: qual.qualification_type.is_requestable,
    userValue: resolveUserQualificationValue(qual),
    userMeetsQualification: !!qual.caller_meets_requirement,
    qualificationValues: qual.qualification_values
  }));

const resolveUserQualificationValue = (
  qual: WorkerApiQualification
): string | number => {
  const {
    integer_value,
    locale_value: { country, subdivision }
  } = qual.caller_qualification_value;
  if (integer_value !== null && Number.isFinite(integer_value)) {
    return integer_value;
  } else if (!!country && !!subdivision) {
    return `${country} - ${subdivision}`;
  } else if (!!country) {
    return country;
  } else {
    return 'Doesn\'t exist.';
  }
};

export var x = {
  qualification_type_id: '3V75YMGIEXYVCDJFPSK5TD5CAIB4NZ',
  comparator: 'GreaterThan',
  worker_action: 'PreviewHit',
  qualification_values: ['0'],
  caller_meets_requirement: false,
  qualification_type: {
    qualification_type_id: '3V75YMGIEXYVCDJFPSK5TD5CAIB4NZ',
    name: 'rekognition internal',
    visibility: true,
    description: 'internal workers',
    has_test: false,
    is_requestable: true,
    keywords: null
  },
  caller_qualification_value: {
    integer_value: null,
    locale_value: {
      country: null,
      subdivision: null
    }
  },
  qualification_request_url:
    '/qualifications/3V75YMGIEXYVCDJFPSK5TD5CAIB4NZ/request'
};
