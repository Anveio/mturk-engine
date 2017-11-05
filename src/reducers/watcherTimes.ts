import { WatcherTimerMap } from '../types';
import { ScheduleWatcherTick, CancelWatcherTick } from '../actions/watcher';
import {
  SCHEDULE_NEXT_WATCHER_TICK,
  CANCEL_NEXT_WATCHER_TICK
} from '../constants';
import { Map } from 'immutable';
// import { watcherFromId, conflictsOnlyUseNewDateProp } from '../utils/watchers';

const initial: WatcherTimerMap = Map<string, Date | null>();

type WatcherAction = CancelWatcherTick | ScheduleWatcherTick;

export default (state = initial, action: WatcherAction) => {
  switch (action.type) {
    case SCHEDULE_NEXT_WATCHER_TICK:
      return state.set(action.groupId, action.time);
    case CANCEL_NEXT_WATCHER_TICK:
      return state.set(action.groupId, null);
    default:
      return state;
  }
};
