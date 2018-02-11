import { createSelector } from 'reselect';
import { watcherFoldersSelector } from './index';
import { FolderTreeNode } from '../utils/tree';
import { WatcherFolder, Watcher } from '../types';
import { normalizedWatchers } from './watchers';
import { Map } from 'immutable';
import { watchersArrayToTreeNodes } from '../utils/watchers';

const watchersToFolderWatcherMap = createSelector(
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

export const watcherFoldersToTreeNodes = createSelector(
  [watcherFoldersSelector, watchersToFolderWatcherMap],
  (watcherFolders, watcherFolderMap): FolderTreeNode[] => {
    return watcherFolders.reduce(
      (acc: FolderTreeNode[], folder: WatcherFolder): FolderTreeNode[] => {
        return [
          ...acc,
          {
            id: folder.id,
            label: folder.name,
            isExpanded: folder.expanded,
            kind: 'folder',
            iconName: folder.expanded ? 'folder-open' : 'folder-close',
            childNodes: watchersArrayToTreeNodes(
              watcherFolderMap.get(folder.id, [])
            )
          }
        ];
      },
      []
    );
  }
);

// const watchersAssignedToFolder = (folderId: string) =>
//   createSelector([normalizedWatchers], watchers => {
//     watchers
//       .filter((watcher: Watcher) => watcher.folderId === folderId)
//       .reduce((acc: Watcher[], cur) => [...acc, cur], []);
//   });
