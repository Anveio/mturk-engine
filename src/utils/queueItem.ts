import { QueueItem, SearchResult } from '../types';
import * as v4 from 'uuid/v4';

export const blankQueueItem = (groupId: string): QueueItem => ({
  groupId,
  hitId: '[REFRESH_REQUIRED]' + v4(),
  requester: {
    name: '[REFRESH_REQUIRED]',
    id: '[REFRESH_REQUIRED]' + v4()
  },
  reward: 0,
  taskId: 'REFRESH_REQUIRED',
  timeLeftInSeconds: 10000,
  title: 'REFRESH_REQUIRED'
});

export const queueItemFromSearchResult = (hit: SearchResult): QueueItem => {
  const { groupId, reward, timeAllottedInSeconds, requester, title } = hit;
  return {
    groupId,
    hitId: '[REFRESH_REQUIRED]' + v4(),
    reward,
    taskId: '[REFRESH_REQUIRED]' + v4(),
    timeLeftInSeconds: timeAllottedInSeconds,
    requester: requester,
    title: '[REFRESH_REQUIRED]' + title
  };
};
