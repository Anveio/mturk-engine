import { QueueItem, SearchResult } from '../types';
import * as v4 from 'uuid/v4';

const NEEDS_REFRESH_PREFIX = '[REFRESH_REQUIRED]';

export const blankQueueItem = (groupId: string): QueueItem => ({
  groupId,
  hitId: NEEDS_REFRESH_PREFIX + v4(),
  assignmentId: NEEDS_REFRESH_PREFIX + v4(),
  requester: {
    name: NEEDS_REFRESH_PREFIX,
    id: NEEDS_REFRESH_PREFIX + v4()
  },
  reward: 0,
  taskId: NEEDS_REFRESH_PREFIX + v4(),
  timeLeftInSeconds: 0,
  timeAllottedInSeconds: 0,
  title: NEEDS_REFRESH_PREFIX,
  description: NEEDS_REFRESH_PREFIX,
  batchSize: 0,
  qualsRequired: []
});

export const queueItemFromSearchResult = (hit: SearchResult): QueueItem => {
  const { groupId, reward, timeAllottedInSeconds, requester, title } = hit;
  return {
    groupId,
    hitId: NEEDS_REFRESH_PREFIX + v4(),
    assignmentId: NEEDS_REFRESH_PREFIX + v4(),
    taskId: NEEDS_REFRESH_PREFIX + v4(),
    reward,
    timeLeftInSeconds: timeAllottedInSeconds,
    requester: requester,
    title: NEEDS_REFRESH_PREFIX + title,
    description: NEEDS_REFRESH_PREFIX,
    timeAllottedInSeconds: hit.timeAllottedInSeconds,
    batchSize: hit.batchSize,
    qualsRequired: hit.qualsRequired
  };
};
