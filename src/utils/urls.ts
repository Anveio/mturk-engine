import { QueueItem } from '../types';

const noRedirectParam = '&doNotRedirect=true';

export const generateAcceptUrl = (groupId: string) =>
  `https://worker.mturk.com/projects/${groupId}/tasks/accept_random`;

export const generatePreviewUrl = (groupId: string) =>
  `https://worker.mturk.com/projects/${groupId}/tasks`;

export const generateContinueWorkUrl = (hit: QueueItem, legacy = false) =>
  legacy
    ? `https://www.mturk.com/mturk/continue?hitId=${
        hit.hitId
      }${noRedirectParam}`
    : `https://worker.com/projects/${hit.groupId}/tasks/${
        hit.taskId
      }?assignment_id=${hit.hitId}`;
