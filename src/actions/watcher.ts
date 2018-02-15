import {
  ADD_WATCHER,
  DELETE_WATCHER,
  SCHEDULE_NEXT_WATCHER_TICK,
  CANCEL_NEXT_WATCHER_TICK,
  SET_WATCHER_TIMER
} from '../constants';

import { Watcher } from '../types';

export interface AddWatcher {
  readonly type: ADD_WATCHER;
  readonly watcher: Watcher;
}
export interface DeleteWatcher {
  readonly type: DELETE_WATCHER;
  readonly groupId: string;
}

export interface ScheduleWatcherTick {
  readonly type: SCHEDULE_NEXT_WATCHER_TICK;
  readonly id: string;
}

export interface CancelWatcherTick {
  readonly type: CANCEL_NEXT_WATCHER_TICK;
  readonly groupId: string;
}

export interface SetWatcherTimer {
  readonly type: SET_WATCHER_TIMER;
  readonly id: string;
  readonly delayInSeconds: number;
  readonly origin: number;
}

export const addWatcher = (watcher: Watcher): AddWatcher => ({
  type: ADD_WATCHER,
  watcher
});

export const deleteWatcher = (groupId: string): DeleteWatcher => ({
  type: DELETE_WATCHER,
  groupId
});

export const scheduleWatcher = (id: string): ScheduleWatcherTick => ({
  type: SCHEDULE_NEXT_WATCHER_TICK,
  id
});

export const cancelNextWatcherTick = (groupId: string): CancelWatcherTick => ({
  type: CANCEL_NEXT_WATCHER_TICK,
  groupId
});

export const setWatcherTimer = (
  id: string,
  delayInSeconds: number,
  origin: number
): SetWatcherTimer => ({
  type: SET_WATCHER_TIMER,
  id,
  delayInSeconds,
  origin
});
