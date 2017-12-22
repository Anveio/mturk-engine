import * as qs from 'qs';
import { QueueItem, HitDatabaseEntry, SearchResult } from '../types';
import {
  baseContactUrlLegacy,
  baseContactUrlWorker,
  baseAcceptUrlLegacy,
  baseAcceptUrlWorker,
  basePreviewUrlLegacy,
  basePreviewUrlWorker
} from '../constants/urls';
import { legacyDateFormatToContactDateFormat } from './dates';

const noRedirectParam = '&doNotRedirect=true';

export const generateAcceptUrl = (groupId: string, legacy = false) =>
  legacy
    ? `${baseAcceptUrlLegacy}${groupId}${noRedirectParam}`
    : `${baseAcceptUrlWorker}${groupId}/tasks/accept_random`;

export const generatePreviewUrl = (groupId: string, legacy = false) =>
  legacy
    ? `${basePreviewUrlLegacy}${groupId}${noRedirectParam}`
    : `${basePreviewUrlWorker}${groupId}/tasks`;

export const generateContinueWorkUrl = (hit: QueueItem, legacy = false) =>
  legacy
    ? `https://www.mturk.com/mturk/continue?hitId=${
        hit.hitId
      }${noRedirectParam}`
    : `https://worker.mturk.com/projects/${hit.groupId}/tasks/${
        hit.taskId
      }?assignment_id=${hit.hitId}`;

export const generateContactLink = (
  hit: HitDatabaseEntry,
  legacy = false
): string => {
  return legacy
    ? generateLegacyContactLink(hit)
    : generateWorkerContactLink(hit);
};

const generateLegacyContactLink = (hit: HitDatabaseEntry) => {
  const { requester, id, title } = hit;
  return (
    baseContactUrlLegacy +
    'requesterId=' +
    requester.id +
    '&hitId=' +
    id +
    '&requesterName=' +
    requester.name +
    '&subject=Regarding Amazon Mechanical Turk HIT' +
    id +
    '&hitTitle=' +
    title +
    noRedirectParam
  );
};

const generateWorkerContactLink = (hit: HitDatabaseEntry) => {
  const { requester, id, title } = hit;
  return (
    baseContactUrlWorker +
    qs.stringify(
      {
        assignment_message: {
          assignment_id: id,
          subject: `Regarding Amazon Mechanical Turk HIT ${id}`
        },
        completed_date: legacyDateFormatToContactDateFormat(hit.date),
        hit_id: id,
        requester_id: requester.id,
        requester_name: requester.name,
        title: title
      },
      { arrayFormat: 'brackets' }
    )
  );
};

export const generateContactLinkSearchResult = (hit: SearchResult) => {
  const { requester, groupId, title } = hit;
  return (
    'https://www.mturk.com/mturk/contact?requesterId=' +
    requester.id +
    '&requesterName=' +
    requester.name +
    '&subject=Regarding Amazon Mechanical Turk HIT of group ID ' +
    groupId +
    '&hitTitle=' +
    title +
    noRedirectParam
  );
};

export const generateTransferEarningsUrl = (legacy = false) =>
  legacy
    ? 'https://www.mturk.com/mturk/transferearnings'
    : 'https://worker.mturk.com/earnings';
