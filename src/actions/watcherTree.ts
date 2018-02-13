import { SELECT_WATCHER_FILE } from '../constants/index';
import { WatcherKind } from '../types';

export interface SelectWatcherFile {
  readonly type: SELECT_WATCHER_FILE;
  readonly watcherId: string;
  readonly watcherKind: WatcherKind;
}

export const selectWatcherFile = (
  watcherId: string,
  watcherKind: WatcherKind
): SelectWatcherFile => ({
  type: SELECT_WATCHER_FILE,
  watcherId,
  watcherKind
});
