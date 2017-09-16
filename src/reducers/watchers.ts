import { WatcherMap, Watcher } from '../types';
import { AddWatcher, DeleteWatcher } from '../actions/watcher';
import { ADD_WATCHER, DELETE_WATCHER } from '../constants';
import { Map } from 'immutable';
import { watcherFromId } from '../utils/watchers';

const initial: WatcherMap = Map<string, Watcher>();

export default (state = initial, action: AddWatcher | DeleteWatcher) => {
  switch (action.type) {
    case ADD_WATCHER:
      return state.merge(watcherFromId(action.groupId));
    case DELETE_WATCHER:
      return state.delete(action.groupId);
    default:
      return state;
  }
};
