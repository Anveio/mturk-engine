import { createSelector } from 'reselect';
import { Watcher, WatcherMap } from '../types';
import { watcherSelector } from './index';
import { WatcherTreeNode } from '../utils/tree';

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

export const watchersListToTreeNodes = createSelector(
  [watchersList],
  (watchers): WatcherTreeNode[] =>
    watchers.map((watcher: Watcher): WatcherTreeNode => ({
      id: watcher.groupId,
      iconName: 'document',
      label: watcher.title,
      kind: 'groupId'
    }))
);
