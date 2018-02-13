import { WATCHER_FOLDER_TOGGLE_EXPAND } from '../constants/index';

export interface ToggleWatcherFolderExpand {
  readonly type: WATCHER_FOLDER_TOGGLE_EXPAND;
  readonly folderId: string;
}

export type WatcherFolderAction = ToggleWatcherFolderExpand;

export const toggleWatcherFolderExpand = (
  folderId: string
): ToggleWatcherFolderExpand => ({
  type: WATCHER_FOLDER_TOGGLE_EXPAND,
  folderId
});
