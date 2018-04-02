import { WatcherMap, Watcher, GroupId } from '../types';
import { WatcherAction } from '../actions/watcher';
import {
  ADD_WATCHER,
  DELETE_WATCHER,
  EDIT_WATCHER_FIELD,
  DELETE_WATCHER_FOLDER
} from '../constants';
import { Map } from 'immutable';
import { DeleteWatcherFolder } from '../actions/watcherFolders';

const initial: WatcherMap = Map<GroupId, Watcher>();

export default (
  state = initial,
  action: WatcherAction | DeleteWatcherFolder
) => {
  switch (action.type) {
    case ADD_WATCHER:
      return state.set(action.watcher.groupId, action.watcher);
    case DELETE_WATCHER:
      return state.delete(action.groupId);
    case EDIT_WATCHER_FIELD:
      return state.update(action.groupId, (watcher): Watcher => ({
        ...watcher,
        [action.field]: action.value
      }));
    case DELETE_WATCHER_FOLDER:
      return state.filterNot(
        (watcher: Watcher) => watcher.folderId === action.folderId
      );
    default:
      return state;
  }
};
