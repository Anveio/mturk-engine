import { SELECT_WATCHER_FOLDER } from '../constants/index';

export interface SelectWatcherFolder {
  readonly type: SELECT_WATCHER_FOLDER;
  readonly folderId: string;
}

export const selectWatcherFolder = (folderId: string): SelectWatcherFolder => ({
  type: SELECT_WATCHER_FOLDER,
  folderId
});
