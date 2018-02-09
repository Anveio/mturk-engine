import { SELECT_WATCHER_FILE, SELECT_WATCHER_FOLDER } from '../constants/index';
import { WatcherKind } from '../types';

export interface SelectWatcherFile {
  readonly type: SELECT_WATCHER_FILE;
  readonly watcherId: string;
  readonly watcherKind: WatcherKind;
}

export interface SelectWatcherFolder {
  readonly type: SELECT_WATCHER_FOLDER;
  readonly folderId: string;
}

export type SelectWatcherTreeNodeAction =
  | SelectWatcherFile
  | SelectWatcherFolder;

export const selectWatcherFile = (
  watcherId: string,
  watcherKind: WatcherKind
): SelectWatcherFile => ({
  type: SELECT_WATCHER_FILE,
  watcherId,
  watcherKind
});

export const selectWatcherFolder = (folderId: string): SelectWatcherFolder => ({
  type: SELECT_WATCHER_FOLDER,
  folderId
});
