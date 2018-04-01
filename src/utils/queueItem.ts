import { QueueItem, SearchResult } from '../types';
import * as v4 from 'uuid/v4';

export const blankQueueItem = (groupId: string): QueueItem => ({
  groupId,
  hitId: '[REFRESH_REQUIRED]' + v4(),
  assignmentId: '[REFRESH_REQUIRED]' + v4(),
  requester: {
    name: '[REFRESH_REQUIRED]',
    id: '[REFRESH_REQUIRED]' + v4()
  },
  reward: 0,
  taskId: 'REFRESH_REQUIRED',
  timeLeftInSeconds: 0,
  timeAllottedInSeconds: 0,
  title: '[REFRESH_REQUIRED]',
  description: '[REFRESH_REQUIRED]',
  batchSize: 0,
  qualsRequired: []
});

export const queueItemFromSearchResult = (hit: SearchResult): QueueItem => {
  const { groupId, reward, timeAllottedInSeconds, requester, title } = hit;
  return {
    groupId,
    hitId: '[REFRESH_REQUIRED]' + v4(),
    assignmentId: '[REFRESH_REQUIRED]' + v4(),
    taskId: '[REFRESH_REQUIRED]' + v4(),
    reward,
    timeLeftInSeconds: timeAllottedInSeconds,
    requester: requester,
    title: '[REFRESH_REQUIRED]' + title,
    description: '[REFRESH_REQUIRED]',
    timeAllottedInSeconds: hit.timeAllottedInSeconds,
    batchSize: hit.batchSize,
    qualsRequired: hit.qualsRequired
  };
};
