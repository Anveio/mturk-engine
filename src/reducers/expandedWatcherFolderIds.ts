import { Set } from 'immutable';
import { WatcherTreeAction } from '../actions/watcherTree';
import { WATCHER_FOLDER_TOGGLE_EXPAND, ADD_WATCHER } from '../constants';
import { DEFAULT_WATCHER_FOLDER_ID } from '../constants/misc';
import { AddWatcher } from '../actions/watcher';
import { FolderId } from 'types';

const initial = Set<FolderId>([DEFAULT_WATCHER_FOLDER_ID]);

export default (
  state = initial,
  action: WatcherTreeAction | AddWatcher
): Set<FolderId> => {
  switch (action.type) {
    case WATCHER_FOLDER_TOGGLE_EXPAND:
      return state.has(action.folderId)
        ? state.delete(action.folderId)
        : state.add(action.folderId);
    case ADD_WATCHER:
      return state.add(action.watcher.folderId);
    default:
      return state;
  }
};
