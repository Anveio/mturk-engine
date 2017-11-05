import { WatcherMap, Watcher } from '../types';
import {
  AddWatcher,
  DeleteWatcher,
  ToggleWatcherActivity,
  ScheduleWatcherTick,
  CancelWatcherTick
} from '../actions/watcher';
import { WatcherEdit } from '../actions/editWatcher';
import {
  ADD_WATCHER,
  DELETE_WATCHER,
  EDIT_WATCHER_FIELD,
  TOGGLE_WATCHER_ACTIVE,
} from '../constants';
import { Map } from 'immutable';
// import { watcherFromId, conflictsOnlyUseNewDateProp } from '../utils/watchers';

const initial: WatcherMap = Map<string, Watcher>();

type WatcherAction =
  | AddWatcher
  | WatcherEdit
  | DeleteWatcher
  | CancelWatcherTick
  | ScheduleWatcherTick
  | ToggleWatcherActivity;

export default (state = initial, action: WatcherAction) => {
  switch (action.type) {
    case ADD_WATCHER:
      return state.set(action.watcher.groupId, action.watcher);
    case DELETE_WATCHER:
      return state.delete(action.groupId);
    case TOGGLE_WATCHER_ACTIVE:
      return state.update(action.groupId, (watcher): Watcher => ({
        ...watcher,
        active: !action.active
      }));
    case EDIT_WATCHER_FIELD:
      return state.update(action.groupId, (watcher): Watcher => ({
        ...watcher,
        [action.field]: action.value
      }));
    default:
      return state;
  }
};
