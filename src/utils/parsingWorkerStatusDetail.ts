import { HitDatabaseEntry, HitDatabaseMap } from '../types';
import { Map } from 'immutable';
import { StatusDetailPageInfo } from '../api/statusDetail';
import {
  StatusDetailApiResponse,
  WorkerSubmittedHit
} from '../worker-mturk-api';

export const 
parseStatusDetailPage = (
  data: StatusDetailApiResponse,
  legacyDateString: string
): StatusDetailPageInfo => {
  try {
    return {
      data: tabulateHitDbEntries(data.results, legacyDateString),
      morePages: false
    };
  } catch (e) {
    console.warn(e);
    return {
      data: Map<string, HitDatabaseEntry>(),
      morePages: false
    };
  }
};

const tabulateHitDbEntries = (
  hits: WorkerSubmittedHit[],
  legacyDateString: string
): HitDatabaseMap =>
  hits.reduce((map: HitDatabaseMap, hit: WorkerSubmittedHit) => {
    return map.set(hit.hit_id, generateHitDbEntry(hit, legacyDateString));
    // tslint:disable-next-line:align
  }, Map<string, HitDatabaseEntry>());

const generateHitDbEntry = (
  submittedHit: WorkerSubmittedHit,
  dateString: string
): HitDatabaseEntry => {
  const {
    hit_id,
    requester_id,
    requester_name,
    requester_feedback,
    reward: { amount_in_dollars },
    title,
    state
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
    feedback: requester_feedback || undefined
  };
};

// const detectMorePages = (data: StatusDetailApiResponse): boolean =>
//   data.num_results * data.page_number < data.total_num_results;
