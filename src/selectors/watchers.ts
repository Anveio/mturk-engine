import { createSelector } from 'reselect';
import { Watcher, WatcherMap, RootState } from '../types';
import { watchersSelector } from './index';
import { Map } from 'immutable';
import { DEFAULT_WATCHER_FOLDER_ID } from '../constants/misc';
import { createDefaultWatcher } from '../utils/watchers';

/**
 * For backwards compatibility. Legacy watchers won't have certain properties.
 * Here we ensure they do.
 */
const updateLegacyWatchers = createSelector(
  [watchersSelector],
  (watchers: WatcherMap): WatcherMap =>
    watchers.reduce(
      (acc: WatcherMap, cur: Watcher) =>
        acc.set(cur.groupId, {
          ...createDefaultWatcher(cur.groupId),
          ...cur,
          folderId: cur.folderId ? cur.folderId : DEFAULT_WATCHER_FOLDER_ID
        }),
      Map<string, Watcher>()
    )
);

export const normalizedWatchers = createSelector(
  [watchersSelector, updateLegacyWatchers],
  (allWatchers: WatcherMap, legacyWatchers: WatcherMap): WatcherMap =>
    allWatchers.merge(legacyWatchers)
);

const watchersSortedLatestFirst = createSelector(
  [normalizedWatchers],
  (watchers: WatcherMap) =>
    watchers.sort((a, b) => b.createdOn.valueOf() - a.createdOn.valueOf())
);

export const watcherIdsList = createSelector(
  [watchersSortedLatestFirst],
  (watchers: WatcherMap) =>
    watchers.map((item: Watcher) => item.groupId).toList()
);

export const watchersList = createSelector(
  [watchersSelector],
  (watchers: WatcherMap) =>
    watchers.reduce((acc: Watcher[], cur: Watcher) => [...acc, cur], [])
);

export const getWatcher = (id: string) => (state: RootState) =>
  normalizedWatchers(state).get(id);
