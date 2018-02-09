import { createSelector } from 'reselect';
import { watcherTreeSelector, watcherSelector } from './index';
import { watchersList } from './watchers';
import { WatcherTreeNode } from '../utils/tree';
import { Watcher } from '../types';

export const getCurrentlySelectedWatcherOrNull = createSelector(
  [watcherTreeSelector, watcherSelector],
  (watcherSettings, watchers) => {
    const { selectionId, selectionKind } = watcherSettings;

    if (selectionId && selectionKind !== 'folder') {
      return watchers.get(selectionId) || null;
    } else {
      return null;
    }
  }
);

export const watchersListToTreeNodes = createSelector(
  [watchersList, watcherTreeSelector],
  (watchers, { selectionId }): WatcherTreeNode[] =>
    watchers.map((watcher: Watcher): WatcherTreeNode => ({
      id: watcher.groupId,
      iconName: 'document',
      label: watcher.title,
      isSelected: selectionId === watcher.groupId ? true : false,
      kind: 'groupId'
    }))
);
