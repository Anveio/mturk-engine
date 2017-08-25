import { Props as ItemProps } from '@shopify/polaris/types/components/ResourceList/Item';
import { QueueItem, SearchItem } from '../types';
import { truncate } from './formatting';

export const generateItemProps = (hit: QueueItem): ItemProps => {
  const { requesterName, title } = hit;
  return {
    attributeOne: truncate(requesterName, 40),
    attributeTwo: truncate(title, 75)
  };
};

export const searchItemToQueueItem = (hit: SearchItem): QueueItem => {
  const { requesterName, reward, timeAllotted, title } = hit;
  return {
    hitId: 'Undetermined',
    requesterName,
    reward,
    timeLeft: timeAllotted,
    title
  };
};
