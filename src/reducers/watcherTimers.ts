import { WatcherTimerMap, WatcherTimer, GroupId } from '../types';
import {
  SetWatcherTimer,
  CancelWatcherTick,
  DeleteWatcher
} from '../actions/watcher';
import {
  SET_WATCHER_TIMER,
  CANCEL_NEXT_WATCHER_TICK,
  DELETE_WATCHER,
  API_LIMIT_EXCEEDED
} from '../constants';
import { Map } from 'immutable';
import { calculateTimeFromDelay } from '../utils/dates';
import { ApiRateLimitExceeded } from 'actions/api';

const initial: WatcherTimerMap = Map<GroupId, WatcherTimer>();

type WatcherTimerAction =
  | CancelWatcherTick
  | SetWatcherTimer
  | DeleteWatcher
  | ApiRateLimitExceeded;

export default (state = initial, action: WatcherTimerAction) => {
  switch (action.type) {
    case SET_WATCHER_TIMER:
      return state.set(action.id, {
        date: calculateTimeFromDelay(action.origin, action.delayInSeconds),
        origin: action.origin
      });
    case API_LIMIT_EXCEEDED:
      return state.delete(action.watcherId);
    case DELETE_WATCHER:
    case CANCEL_NEXT_WATCHER_TICK:
      return state.delete(action.groupId);
    default:
      return state;
  }
};
