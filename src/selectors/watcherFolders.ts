import { createSelector } from 'reselect';
import { watcherFoldersSelector } from './index';
import { Watcher, WatcherFolder, WatcherFolderMap } from '../types';
import { normalizedWatchers } from './watchers';
import { Map, Set } from 'immutable';
import { sortWatcherFoldersNewestFirst } from '../utils/sorting';

export const watcherFoldersSortedByCreationDate = createSelector(
  [watcherFoldersSelector],
  folders => folders.sort(sortWatcherFoldersNewestFirst) as WatcherFolderMap
);

export const watchersToFolderWatcherMap = createSelector(
  [normalizedWatchers, watcherFoldersSelector],
  (watchers, folders) => {
    return watchers.reduce(
      (acc: Map<string, Watcher[]>, cur: Watcher) =>
        acc.update(
          cur.folderId,
          (watcherArray: Watcher[]) =>
            watcherArray && watcherArray.length > 0
              ? [...watcherArray, cur]
              : [cur]
        ),
      Map<string, Watcher[]>()
    );
  }
);

const getWatchersAssignedToFolder = (folderId: string) =>
  createSelector([watchersToFolderWatcherMap], watcherFolderMap =>
    watcherFolderMap.get(folderId, [])
  );

export const getWatcherIdsAssignedToFolder = (folderId: string) =>
  createSelector([getWatchersAssignedToFolder(folderId)], watchers =>
    watchers.map((cur: Watcher) => cur.groupId)
  );

export const watcherFolderUniqueNames = createSelector(
  [watcherFoldersSelector],
  watcherFolders =>
    watcherFolders.reduce(
      (acc: Set<string>, cur: WatcherFolder) => acc.add(cur.name),
      Set<string>()
    )
);
