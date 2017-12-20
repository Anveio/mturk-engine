import { HitDatabaseEntry, HitDatabaseMap } from '../types';
import { Map } from 'immutable';
import {
  statusDetailMorePages,
  mturkTableDataNodeQuerySelector
} from '../constants/querySelectors';
import { StatusDetailPageInfo } from '../api/statusDetail';
import { parseReactProps } from './parsing';
import {
  StatusDetailApiResponse,
  WorkerSubmittedHit
} from '../worker-mturk-api';
import { workerDateStringToLegacyDateString } from './dates';

export const parseStatusDetailPage = (
  html: Document,
  dateString: string
): StatusDetailPageInfo => {
  try {
    const hits = parseSubmittedHits(html);
    const workerFormattedDate = workerDateStringToLegacyDateString(dateString);
    return {
      data: tabulateHitDbEntries(hits, workerFormattedDate),
      morePages: detectMorePages(html)
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
  dateString: string
): HitDatabaseMap =>
  hits.reduce((map: HitDatabaseMap, hit: WorkerSubmittedHit) => {
    return map.set(hit.hit_id, generateHitDbEntry(hit, dateString));
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
    reward,
    title,
    state
  } = submittedHit;
  return {
    id: hit_id,
    reward,
    bonus: 0,
    requester: {
      id: requester_id,
      name: requester_name
    },
    date: dateString,
    status: state,
    title: title,
    feedback: requester_feedback
  };
};

const detectMorePages = (html: Document): boolean => {
  return !!html.querySelector(statusDetailMorePages);
};

const parseSubmittedHits = (html: Document) => {
  const reactProps = parseReactProps(html)(mturkTableDataNodeQuerySelector);
  const pageData: StatusDetailApiResponse = JSON.parse(reactProps);
  return pageData.bodyData;
};
