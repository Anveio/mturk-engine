import { WatcherMap, Watcher } from '../types';
import { WatcherAction } from '../actions/watcher';
import { ADD_WATCHER, DELETE_WATCHER, EDIT_WATCHER_FIELD } from '../constants';
import { Map } from 'immutable';

const initial: WatcherMap = Map<string, Watcher>();

export default (state = initial, action: WatcherAction) => {
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
    default:
      return state;
  }
};
