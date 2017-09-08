import { Props as ItemProps } from '@shopify/polaris/types/components/ResourceList/Item';
import { QueueItem, SearchResult } from '../types';
import { truncate } from './formatting';

export const generateItemProps = (hit: QueueItem): ItemProps => {
  const { requesterName, title } = hit;
  return {
    attributeOne: truncate(requesterName, 40),
    attributeTwo: truncate(title, 75)
  };
};

/**
 * Creates a QueueItem from a SearchItem, setting the hitId to undetermined, and
 * using the SearchItem's timeAlloted property to set the QueueItem's timeLeft
 * property. Both of these properties should be updated when the queue is 
 * refreshed.
 * @param hit 
 */
export const searchItemToQueueItem = (hit: SearchResult): QueueItem => {
  const { requester, reward, timeAllotted, title } = hit;
  return {
    hitId: 'Undetermined',
    requesterName: requester.name,
    reward,
    timeLeft: timeAllotted,
    title
  };
};
