import { createSelector } from 'reselect';
import { watcherTreeSelector } from './index';
import { normalizedWatchers } from './watchers';
import { Watcher } from '../types';

export const getCurrentlySelectedWatcherIdOrNull = createSelector(
  [watcherTreeSelector, normalizedWatchers],
  (watcherSettings, watchers) => {
    const { selectionId, selectionKind } = watcherSettings;

    if (selectionId && selectionKind !== 'folder') {
      const maybeSelectedWatcher: Watcher | undefined = watchers.get(
        selectionId,
        undefined
      );
      return maybeSelectedWatcher ? maybeSelectedWatcher.groupId : null;
    } else {
      return null;
    }
  }
);
