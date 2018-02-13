import { createSelector } from 'reselect';
import { watcherTreeSelector, watcherFoldersSelector } from './index';
import { normalizedWatchers } from './watchers';
import { Watcher, WatcherFolder } from '../types';

export const getCurrentSelectionIdOrNull = createSelector(
  [watcherTreeSelector, normalizedWatchers, watcherFoldersSelector],
  (watcherSettings, watchers, watcherFolders) => {
    const { selectionId, selectionKind } = watcherSettings;
    if (!selectionId) {
      return null;
    }

    switch (selectionKind) {
      case 'folder': {
        const maybeSelectedFolder:
          | WatcherFolder
          | undefined = watcherFolders.get(selectionId, undefined);
        return maybeSelectedFolder ? maybeSelectedFolder.id : null;
      }
      default: {
        const maybeSelectedWatcher: Watcher | undefined = watchers.get(
          selectionId,
          undefined
        );
        return maybeSelectedWatcher ? maybeSelectedWatcher.groupId : null;
      }
    }
  }
);
