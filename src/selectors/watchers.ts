import { createSelector } from 'reselect';
import { RootState, Watcher, WatcherMap } from '../types';

export const watcherSelector = (state: RootState) => state.watchers;

export const watcherIds = createSelector(
  [ watcherSelector ],
  (queue: WatcherMap) => queue.map((item: Watcher) => item.groupId).toArray()
);
