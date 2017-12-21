import {
  ADD_WATCHER,
  DELETE_WATCHER,
  SCHEDULE_NEXT_WATCHER_TICK,
  CANCEL_NEXT_WATCHER_TICK
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
  readonly groupId: string;
  readonly delayInSeconds: number;
}

export interface CancelWatcherTick {
  readonly type: CANCEL_NEXT_WATCHER_TICK;
  readonly groupId: string;
}

export const addWatcher = (watcher: Watcher): AddWatcher => ({
  type: ADD_WATCHER,
  watcher
});

export const deleteWatcher = (groupId: string): DeleteWatcher => ({
  type: DELETE_WATCHER,
  groupId
});

export const scheduleWatcher = (
  groupId: string,
  delayInSeconds: number
): ScheduleWatcherTick => ({
  type: SCHEDULE_NEXT_WATCHER_TICK,
  groupId,
  delayInSeconds
});

export const cancelNextWatcherTick = (groupId: string): CancelWatcherTick => ({
  type: CANCEL_NEXT_WATCHER_TICK,
  groupId
});
