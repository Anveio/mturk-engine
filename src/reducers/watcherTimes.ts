import { WatcherTimerMap } from '../types';
import { ScheduleWatcherTick, CancelWatcherTick } from '../actions/watcher';
import {
  SCHEDULE_NEXT_WATCHER_TICK,
  CANCEL_NEXT_WATCHER_TICK
} from '../constants';
import { Map } from 'immutable';
import { calculateTimeFromDelay } from '../utils/dates';
// import { watcherFromId, conflictsOnlyUseNewDateProp } from '../utils/watchers';

const initial: WatcherTimerMap = Map<string, Date>();

type WatcherAction = CancelWatcherTick | ScheduleWatcherTick;

export default (state = initial, action: WatcherAction) => {
  switch (action.type) {
    case SCHEDULE_NEXT_WATCHER_TICK:
      return state.set(
        action.groupId,
        calculateTimeFromDelay(action.delayInSeconds)
      );
    case CANCEL_NEXT_WATCHER_TICK:
      return state.delete(action.groupId);
    default:
      return state;
  }
};
