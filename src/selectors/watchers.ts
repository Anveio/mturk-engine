import { createSelector } from 'reselect';
import { RootState, Watcher, WatcherMap } from '../types';

export const watcherSelector = (state: RootState) => state.watchers;

export const watchersSortedLatestFirst = createSelector(
  [ watcherSelector ],
  (watchers: WatcherMap) =>
    watchers.sort((a, b) => b.createdOn.valueOf() - a.createdOn.valueOf())
);

export const watcherIds = createSelector(
  [ watchersSortedLatestFirst ],
  (watchers: WatcherMap) =>
    watchers.map((item: Watcher) => item.groupId).toList()
);
