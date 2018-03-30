import * as qs from 'qs';
import {
  QueueItem,
  WorkerHitDatabaseEntry,
  HumanIntelligenceTask
} from 'types';
import { baseContactUrl, baseProjectUrl } from '../constants/urls';
import { legacyDateFormatToContactDateFormat } from './dates';

export const generateAcceptUrl = (groupId: string) =>
  `${baseProjectUrl}${groupId}/tasks/accept_random`;

export const generatePreviewUrl = (groupId: string) =>
  `${baseProjectUrl}${groupId}/tasks`;

export const generateContinueWorkUrl = (hit: QueueItem) =>
  `https://worker.mturk.com/projects/${hit.groupId}/tasks/${
    hit.taskId
  }?assignment_id=${hit.hitId}&ref=w_pl_prvw`;

export const generateContactLink = (hit: WorkerHitDatabaseEntry) => {
  const { requester, id, assignmentId, title } = hit;
  return (
    baseContactUrl +
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

export const generateContactLinkSearchResult = (hit: HumanIntelligenceTask) => {
  const { requester, groupId, title } = hit;
  return (
    baseContactUrl +
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
