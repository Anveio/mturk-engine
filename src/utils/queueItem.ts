import { Props as ItemProps } from '@shopify/polaris/types/components/ResourceList/Item';
import { QueueItem } from '../types';
import { truncate } from './formatting';
import * as v4 from 'uuid/v4';

export const generateItemProps = (hit: QueueItem): ItemProps => {
  const { requesterName, title } = hit;
  return {
    attributeOne: truncate(requesterName, 40),
    attributeTwo: truncate(title, 75)
  };
};

export const blankQueueItem = (groupId: string): QueueItem => ({
  groupId,
  hitId: '[REFRESH_REQUIRED]' + v4(),
  requesterName: 'REFRESH_REQUIRED',
  reward: 0,
  taskId: 'REFRESH_REQUIRED',
  timeLeftInSeconds: 10000,
  title: 'REFRESH_REQUIRED'
});
