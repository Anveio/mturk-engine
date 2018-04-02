import { createSelector } from 'reselect';
import {
  Watcher,
  WatcherMap,
  RootState,
  WatcherFolderMap,
  GroupId
} from '../types';
import { watchersSelector, watcherFoldersSelector } from './index';
import { Map } from 'immutable';
import { DEFAULT_WATCHER_FOLDER_ID } from '../constants/misc';
import { createDefaultWatcher } from '../utils/watchers';

/**
 * For backwards compatibility. Legacy watchers won't have certain properties.
 * Here we ensure they do.
 */
const updateLegacyWatchers = createSelector(
  [watchersSelector, watcherFoldersSelector],
  (watchers: WatcherMap, folders: WatcherFolderMap): WatcherMap =>
    watchers.reduce(
      (acc: WatcherMap, cur: Watcher) =>
        acc.set(cur.groupId, {
          ...createDefaultWatcher(cur.groupId),
          ...cur,
          folderId: folders.has(cur.folderId)
            ? cur.folderId
            : DEFAULT_WATCHER_FOLDER_ID
        }),
      Map<GroupId, Watcher>()
    )
);

export const normalizedWatchers = createSelector(
  [watchersSelector, updateLegacyWatchers],
  (allWatchers: WatcherMap, legacyWatchers: WatcherMap): WatcherMap =>
    allWatchers.merge(legacyWatchers)
);

export const getWatcher = (id: string) => (state: RootState) =>
  normalizedWatchers(state).get(id);
