import { createSelector } from 'reselect';
import { watcherTreeSelector, watcherSelector } from './index';

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
