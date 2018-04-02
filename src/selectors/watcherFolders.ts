import { createSelector } from 'reselect';
import { watcherFoldersSelector } from './index';
import { Watcher, WatcherFolder, WatcherFolderMap, FolderId } from '../types';
import { normalizedWatchers } from './watchers';
import { Map, Set } from 'immutable';
import {
  sortWatcherFoldersNewestFirst,
  sortWatchersNewestFirst
} from '../utils/sorting';

export const watcherFoldersSortedByCreationDate = createSelector(
  [watcherFoldersSelector],
  folders => folders.sort(sortWatcherFoldersNewestFirst) as WatcherFolderMap
);

export const watchersToFolderWatcherMap = createSelector(
  [normalizedWatchers, watcherFoldersSelector],
  (watchers, folders) =>
    watchers.reduce(
      (acc: Map<FolderId, Watcher[]>, cur: Watcher) =>
        acc.update(
          cur.folderId,
          (watcherArray: Watcher[]) =>
            watcherArray && watcherArray.length > 0
              ? [...watcherArray, cur]
              : [cur]
        ),
      Map<FolderId, Watcher[]>()
    )
);

export const sortedFolderWatcherMap = createSelector(
  [watchersToFolderWatcherMap],
  watcherFolderMap =>
    watcherFolderMap.map((watchers: Watcher[]) =>
      watchers.sort(sortWatchersNewestFirst)
    ) as Map<FolderId, Watcher[]>
);

export const getWatchersAssignedToFolder = (folderId: string) =>
  createSelector([watchersToFolderWatcherMap], watcherFolderMap =>
    watcherFolderMap.get(folderId, [])
  );

export const getWatcherIdsAssignedToFolder = (folderId: string) =>
  createSelector([getWatchersAssignedToFolder(folderId)], watchers =>
    watchers.map((cur: Watcher) => cur.groupId)
  );

export const getNumWatchersAssignedToFolder = (folderId: string) =>
  createSelector(
    [getWatchersAssignedToFolder(folderId)],
    watchers => watchers.length
  );
export const watcherFolderUniqueNames = createSelector(
  [watcherFoldersSelector],
  watcherFolders =>
    watcherFolders.reduce(
      (acc: Set<string>, cur: WatcherFolder) => acc.add(cur.name),
      Set<string>()
    )
);
