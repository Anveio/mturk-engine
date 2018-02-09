import { createSelector } from 'reselect';
import { Watcher, WatcherMap } from '../types';
import { watcherSelector } from './index';

export const watchersSortedLatestFirst = createSelector(
  [watcherSelector],
  (watchers: WatcherMap) =>
    watchers.sort((a, b) => b.createdOn.valueOf() - a.createdOn.valueOf())
);

export const watcherIdsList = createSelector(
  [watchersSortedLatestFirst],
  (watchers: WatcherMap) =>
    watchers.map((item: Watcher) => item.groupId).toList()
);

export const watchersList = createSelector(
  [watcherSelector],
  (watchers: WatcherMap) =>
    watchers.reduce((acc: Watcher[], cur: Watcher) => acc.concat(cur), [])
);
