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
  TOGGLE_WATCHER_ACTIVE,
  SCHEDULE_NEXT_WATCHER_TICK,
  CANCEL_NEXT_WATCHER_TICK,
  EDIT_WATCHER_FIELD
} from '../constants';
import { Map } from 'immutable';
import { watcherFromId, conflictsOnlyUseNewDateProp } from '../utils/watchers';

const initial: WatcherMap = Map<string, Watcher>();

type WatcherAction =
  | ToggleWatcherActivity
  | AddWatcher
  | DeleteWatcher
  | ScheduleWatcherTick
  | CancelWatcherTick
  | WatcherEdit;

export default (state = initial, action: WatcherAction) => {
  switch (action.type) {
    case ADD_WATCHER:
      return state.mergeWith(
        conflictsOnlyUseNewDateProp,
        watcherFromId(action.groupId)
      );
    case DELETE_WATCHER:
      return state.delete(action.groupId);
    case TOGGLE_WATCHER_ACTIVE:
      return state.update(action.groupId, (watcher): Watcher => ({
        ...watcher,
        active: !action.active
      }));
    case SCHEDULE_NEXT_WATCHER_TICK:
      return state.update(action.groupId, (watcher): Watcher => ({
        ...watcher,
        timeNextAttempt: action.time
      }));
    case CANCEL_NEXT_WATCHER_TICK:
      return state.update(action.groupId, (watcher): Watcher => ({
        ...watcher,
        timeNextAttempt: null
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
