import { WatcherTimerMap, WatcherTimer } from '../types';
import { ScheduleWatcherTick, CancelWatcherTick } from '../actions/watcher';
import {
  SCHEDULE_NEXT_WATCHER_TICK,
  CANCEL_NEXT_WATCHER_TICK
} from '../constants';
import { Map } from 'immutable';
import { calculateTimeFromDelay } from '../utils/dates';
// import { watcherFromId, conflictsOnlyUseNewDateProp } from '../utils/watchers';

const initial: WatcherTimerMap = Map<string, WatcherTimer>();

type WatcherAction = CancelWatcherTick | ScheduleWatcherTick;

export default (state = initial, action: WatcherAction) => {
  switch (action.type) {
    case SCHEDULE_NEXT_WATCHER_TICK:
      return state.set(action.watcher.groupId, {
        date: calculateTimeFromDelay(action.watcher.delay),
        origin: action.origin
      });
    case CANCEL_NEXT_WATCHER_TICK:
      return state.delete(action.groupId);
    default:
      return state;
  }
};
