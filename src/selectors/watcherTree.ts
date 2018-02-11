import { createSelector } from 'reselect';
import { watcherTreeSelector } from './index';
import { normalizedWatchers } from './watchers';

export const getCurrentlySelectedWatcherOrNull = createSelector(
  [watcherTreeSelector, normalizedWatchers],
  (watcherSettings, watchers) => {
    const { selectionId, selectionKind } = watcherSettings;

    if (selectionId && selectionKind !== 'folder') {
      return watchers.get(selectionId) || null;
    } else {
      return null;
    }
  }
);
