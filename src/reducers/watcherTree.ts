import { Set } from 'immutable';
import { WatcherTreeAction } from '../actions/watcherTree';
import {
  SELECT_WATCHER_TREE_NODE,
  WATCHER_FOLDER_TOGGLE_EXPAND,
  ADD_WATCHER
} from '../constants';
import { WatcherTreeSettings } from '../types';
import { DEFAULT_WATCHER_FOLDER_ID } from '../constants/misc';
import { AddWatcher } from '../actions/watcher';

const initial: WatcherTreeSettings = {
  selectionKind: 'none',
  selectionId: null,
  expandedFolderIds: Set<string>([DEFAULT_WATCHER_FOLDER_ID])
};

export default (
  state = initial,
  action: WatcherTreeAction | AddWatcher
): WatcherTreeSettings => {
  switch (action.type) {
    case SELECT_WATCHER_TREE_NODE:
      return {
        ...state,
        selectionId: action.id,
        selectionKind: action.selectionKind
      };
    case WATCHER_FOLDER_TOGGLE_EXPAND:
      return {
        ...state,
        expandedFolderIds: state.expandedFolderIds.has(action.folderId)
          ? state.expandedFolderIds.delete(action.folderId)
          : state.expandedFolderIds.add(action.folderId)
      };
    case ADD_WATCHER:
      return {
        ...state,
        expandedFolderIds: state.expandedFolderIds.add(action.watcher.folderId)
      };
    default:
      return state;
  }
};
