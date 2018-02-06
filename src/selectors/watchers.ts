import { createSelector } from 'reselect';
import { Watcher, WatcherMap } from '../types';
import { watcherSelector } from './index';
import { List } from 'immutable';
import { ITreeNode } from '@blueprintjs/core';

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
    watchers.reduce(
      (acc: List<Watcher>, cur: Watcher) => acc.push(cur),
      List([])
    )
);

export const watchersListToTreeNodes = createSelector(
  [watchersList],
  (watchers): List<ITreeNode> => {
    return watchers.map((watcher: Watcher): ITreeNode => ({
      id: watcher.groupId,
      iconName: 'document',
      label: watcher.title
    })) as List<ITreeNode>;
  }
);
