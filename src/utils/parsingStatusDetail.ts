import {
  HitDatabaseEntry,
  HitDatabaseMap,
  WorkerHitDatabaseEntry,
  HitId,
  LegacyDateFormat
} from '../types';
import { Map } from 'immutable';
import { StatusDetailPageInfo } from '../api/statusDetail';
import {
  StatusDetailApiResponse,
  WorkerSubmittedHit
} from '../worker-mturk-api';
import { STATUS_DETAIL_RESULTS_PER_PAGE } from '../constants/misc';

export const parseStatusDetailPage = (
  data: StatusDetailApiResponse,
  legacyDateString: LegacyDateFormat
): StatusDetailPageInfo => {
  try {
    return {
      data: tabulateHitDbEntries(data.results, legacyDateString),
      morePages: detectMorePages(data)
    };
  } catch (e) {
    console.warn(e);
    return {
      data: Map<HitId, HitDatabaseEntry>(),
      morePages: false
    };
  }
};

const tabulateHitDbEntries = (
  hits: WorkerSubmittedHit[],
  legacyDateString: LegacyDateFormat
): HitDatabaseMap =>
  hits.reduce((map: HitDatabaseMap, hit: WorkerSubmittedHit) => {
    return map.set(hit.hit_id, generateHitDbEntry(hit, legacyDateString));
    // tslint:disable-next-line:align
  }, Map<HitId, WorkerHitDatabaseEntry>());

const generateHitDbEntry = (
  submittedHit: WorkerSubmittedHit,
  dateString: LegacyDateFormat
): WorkerHitDatabaseEntry => {
  const {
    hit_id,
    requester_id,
    requester_name,
    requester_feedback,
    reward: { amount_in_dollars },
    title,
    state,
    assignment_id
  } = submittedHit;
  return {
    id: hit_id,
    reward: amount_in_dollars,
    bonus: 0,
    requester: {
      id: requester_id,
      name: requester_name
    },
    date: dateString,
    status: state,
    title: title,
    assignmentId: assignment_id,
    feedback: requester_feedback || undefined
  };
};

const detectMorePages = (data: StatusDetailApiResponse): boolean =>
  STATUS_DETAIL_RESULTS_PER_PAGE * data.page_number < data.total_num_results;
