import * as qs from 'qs';
import { QueueItem, SearchResult, WorkerHitDatabaseEntry } from '../types';
import {
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
      }?assignment_id=${hit.hitId}&ref=w_pl_prvw`;

// const generateLegacyContactLink = (hit: HitDatabaseEntry) => {
//   const { requester, id, title } = hit;
//   return (
//     baseContactUrlLegacy +
//     'requesterId=' +
//     requester.id +
//     '&hitId=' +
//     id +
//     '&requesterName=' +
//     requester.name +
//     '&subject=Regarding Amazon Mechanical Turk HIT' +
//     id +
//     '&hitTitle=' +
//     title +
//     noRedirectParam
//   );
// };

export const generateContactLink = (hit: WorkerHitDatabaseEntry) => {
  const { requester, id, assignmentId, title } = hit;
  return (
    baseContactUrlWorker +
    qs.stringify(
      {
        assignment_message: {
          assignment_id: assignmentId,
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
    baseContactUrlWorker +
    qs.stringify(
      {
        assignment_message: {
          subject: `Regarding Amazon Mechanical Turk group ID ${groupId}`
        },
        requester_id: requester.id,
        requester_name: requester.name,
        title: title
      },
      { arrayFormat: 'brackets' }
    )
  );
};

export const generateTransferEarningsUrl = (legacy = false) =>
  legacy
    ? 'https://www.mturk.com/mturk/transferearnings'
    : 'https://worker.mturk.com/earnings';
