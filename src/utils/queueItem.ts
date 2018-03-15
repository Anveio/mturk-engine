import { Props as ItemProps } from '@shopify/polaris/types/components/ResourceList/Item';
import { QueueItem, SearchResult } from '../types';
import { truncate } from './formatting';
import * as v4 from 'uuid/v4';

export const generateItemProps = (hit: QueueItem): ItemProps => {
  const { requester, title } = hit;
  return {
    attributeOne: truncate(requester.name, 40),
    attributeTwo: truncate(title, 75)
  };
};

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
