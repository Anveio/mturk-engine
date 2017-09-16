import { WatcherMap, Watcher } from '../types';
import {
  AddWatcher,
  DeleteWatcher,
  ToggleWatcherActivity
} from '../actions/watcher';
import {
  ADD_WATCHER,
  DELETE_WATCHER,
  TOGGLE_WATCHER_ACTIVE
} from '../constants';
import { Map } from 'immutable';
import { watcherFromId } from '../utils/watchers';

const initial: WatcherMap = Map<string, Watcher>();

type WatcherAction = ToggleWatcherActivity | AddWatcher | DeleteWatcher;

export default (state = initial, action: WatcherAction) => {
  switch (action.type) {
    case ADD_WATCHER:
      return state.merge(watcherFromId(action.groupId));
    case DELETE_WATCHER:
      return state.delete(action.groupId);
    case TOGGLE_WATCHER_ACTIVE:
      return state.update(action.groupId, (watcher): Watcher => ({
        ...watcher,
        active: !action.active
      }));
    default:
      return state;
  }
};
