import { Set } from 'immutable';
import { WatcherTreeAction } from '../actions/watcherTree';
import {
  SELECT_WATCHER_TREE_NODE,
  WATCHER_FOLDER_TOGGLE_EXPAND
} from '../constants';
import { WatcherTreeSettings } from '../types';
import { DEFAULT_WATCHER_FOLDER_ID } from '../constants/misc';

const initial: WatcherTreeSettings = {
  selectionKind: 'none',
  selectionId: null,
  expandedFolderIds: Set<string>([DEFAULT_WATCHER_FOLDER_ID])
};

export default (
  state = initial,
  action: WatcherTreeAction
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
    default:
      return state;
  }
};
