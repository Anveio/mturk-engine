import {
  SELECT_WATCHER_FOLDER,
  WATCHER_FOLDER_TOGGLE_EXPAND
} from '../constants/index';

export interface SelectWatcherFolder {
  readonly type: SELECT_WATCHER_FOLDER;
  readonly folderId: string;
}

export interface ToggleWatcherFolderExpand {
  readonly type: WATCHER_FOLDER_TOGGLE_EXPAND;
  readonly folderId: string;
}

export type WatcherFolderAction =
  | SelectWatcherFolder
  | ToggleWatcherFolderExpand;

export const selectWatcherFolder = (folderId: string): SelectWatcherFolder => ({
  type: SELECT_WATCHER_FOLDER,
  folderId
});

export const toggleWatcherFolderExpand = (
  folderId: string
): ToggleWatcherFolderExpand => ({
  type: WATCHER_FOLDER_TOGGLE_EXPAND,
  folderId
});
