import * as qs from 'qs';
import { QueueItem, WorkerHitDatabaseEntry } from 'types';
import { baseContactUrl, baseProjectUrl } from '../constants/urls';
import { legacyDateFormatToContactDateFormat } from './dates';
import { MTURK_URL_ENCODING_FORMAT } from 'constants/misc';

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
      { format: MTURK_URL_ENCODING_FORMAT, arrayFormat: 'brackets' }
    )
  );
};

export const generateContactLinkQueue = (hit: QueueItem) => {
  const { assignmentId, groupId, title, description, requester } = hit;
  return (
    baseContactUrl +
    qs.stringify(
      {
        assignment_id: assignmentId,
        hit_type_message: {
          hit_description: description,
          hit_title: title,
          hit_type_id: hit.groupId,
          requester_id: requester.id,
          requester_name: requester.name,
          subject: `Regarding Amazon Mechanical Turk Project (HIT Type) ${groupId}`
        }
      },
      { format: MTURK_URL_ENCODING_FORMAT, arrayFormat: 'brackets' }
    )
  );
};

export const generateTransferEarningsUrl = (legacy = false) =>
  legacy
    ? 'https://www.mturk.com/mturk/transferearnings'
    : 'https://worker.mturk.com/earnings';
