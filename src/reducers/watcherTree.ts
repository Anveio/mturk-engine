import { SelectWatcherTreeNodeAction } from '../actions/watcherTree';
import { SELECT_WATCHER_FILE, SELECT_WATCHER_FOLDER } from '../constants';
import { WatcherTreeSettings } from '../types';

const initial: WatcherTreeSettings = {
  selectionKind: null,
  selectionId: null,
}

export default (
  state = initial,
  action: SelectWatcherTreeNodeAction
): WatcherTreeSettings => {
  switch (action.type) {
    case SELECT_WATCHER_FILE:
      return {
        ...state,
        selectionId: action.watcherId,
        selectionKind: action.watcherKind
      };
    case SELECT_WATCHER_FOLDER:
      return {
        ...state,
        selectionId: null,
        selectionKind: 'folder'
      }
    default:
      return state;
  }
};
