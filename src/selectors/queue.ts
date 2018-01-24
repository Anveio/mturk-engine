import { createSelector } from 'reselect';
import { RootState, QueueItem, QueueMap } from '../types';
import { Map } from 'immutable';

export const queueSelector = (state: RootState) => state.queue;

export const queueItemsIds = createSelector(
  [queueSelector],
  (queue: QueueMap) => queue.map((item: QueueItem) => item.hitId).toArray()
);

export const uniqueGroupIdsInQueueHistogram = createSelector(
  [queueSelector],
  queue =>
    queue.reduce(
      (acc: Map<string, number>, cur: QueueItem) =>
        acc.update(cur.groupId, (count: number) => (count ? count + 1 : 1)),
      Map<string, number>()
    )
);
