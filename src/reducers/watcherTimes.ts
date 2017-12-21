import { WatcherTimerMap } from '../types';
import {
  ScheduleWatcherTick,
  CancelWatcherTick,
  ToggleWatcherActivity
} from '../actions/watcher';
import {
  SCHEDULE_NEXT_WATCHER_TICK,
  CANCEL_NEXT_WATCHER_TICK
} from '../constants';
import { Map } from 'immutable';
// import { watcherFromId, conflictsOnlyUseNewDateProp } from '../utils/watchers';

const initial: WatcherTimerMap = Map<string, Date>();

type WatcherAction =
  | CancelWatcherTick
  | ScheduleWatcherTick
  | ToggleWatcherActivity;

export default (state = initial, action: WatcherAction) => {
  switch (action.type) {
    case SCHEDULE_NEXT_WATCHER_TICK:
      return state.set(action.groupId, action.time);
    case CANCEL_NEXT_WATCHER_TICK:
      return state.delete(action.groupId);
    default:
      return state;
  }
};
