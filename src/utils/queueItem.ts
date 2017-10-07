import { Props as ItemProps } from '@shopify/polaris/types/components/ResourceList/Item';
import { QueueItem, SearchResult } from '../types';
import * as v4 from 'uuid/v4';
import { truncate } from './formatting';

export const generateItemProps = (hit: QueueItem): ItemProps => {
  const { requesterName, title } = hit;
  return {
    attributeOne: truncate(requesterName, 40),
    attributeTwo: truncate(title, 75)
  };
};

/**
 * Creates a QueueItem from a SearchItem, setting the hitId to [Refresh Required], and
 * using the SearchItem's timeAlloted property to set the QueueItem's timeLeft
 * property. Both of these properties should be updated when the queue is 
 * refreshed.
 * @param hit 
 */
export const searchItemToQueueItem = (hit: SearchResult): QueueItem => {
  const { requester, reward, timeAllotted, title } = hit;
  return {
    hitId: '[Refresh Required]',
    requesterName: requester.name,
    reward,
    timeLeft: timeAllotted,
    title
  };
};

/**
 * To be used when nothing is known of a successfully accepted HIT (e.g. when 
 * accepting a HIT via a watcher.)
 * @param groupId 
 */
export const blankQueueItem = (groupId: string): QueueItem => {
  return {
    hitId: '[Refresh Required]' + v4(),
    requesterName: '[Refresh Required]',
    reward: 0,
    timeLeft: '[Refresh Required]',
    title: '[Refresh Required]'
  };
};
