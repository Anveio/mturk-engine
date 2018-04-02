import { createSelector } from 'reselect';
import { QueueItem, QueueMap, GroupId } from '../types';
import { Map } from 'immutable';
import { queueSelector } from './index';

export const queueItemsIds = createSelector(
  [queueSelector],
  (queue: QueueMap) => queue.map((item: QueueItem) => item.hitId).toArray()
);

export const uniqueGroupIdsInQueueHistogram = createSelector(
  [queueSelector],
  queue =>
    queue.reduce(
      (acc: Map<GroupId, number>, cur: QueueItem) =>
        acc.update(cur.groupId, (count: number) => (count ? count + 1 : 1)),
      Map<GroupId, number>()
    )
);
