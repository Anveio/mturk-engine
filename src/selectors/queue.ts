import { createSelector } from 'reselect';
import { RootState, QueueItem, QueueMap } from '../types';

export const queueSelector = (state: RootState) => state.queue;

export const queueItemsIds = createSelector(
  [ queueSelector ],
  (queue: QueueMap) => queue.map((item: QueueItem) => item.hitId).toArray()
);
