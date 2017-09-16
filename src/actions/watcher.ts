import {
  ADD_WATCHER,
  DELETE_WATCHER,
  TOGGLE_WATCHER_ACTIVE,
  SCHEDULE_NEXT_WATCHER_TICK,
  CANCEL_NEXT_WATCHER_TICK
} from '../constants';

import { Watcher } from '../types';

export interface AddWatcher {
  type: ADD_WATCHER;
  watcher: Watcher;
}
export interface DeleteWatcher {
  type: DELETE_WATCHER;
  groupId: string;
}

export interface ToggleWatcherActivity {
  type: TOGGLE_WATCHER_ACTIVE;
  groupId: string;
  active: boolean;
}

export interface ScheduleWatcherTick {
  type: SCHEDULE_NEXT_WATCHER_TICK;
  groupId: string;
  time: Date;
}

export interface CancelWatcherTick {
  type: CANCEL_NEXT_WATCHER_TICK;
  groupId: string;
}

export const addWatcher = (watcher: Watcher): AddWatcher => ({
  type: ADD_WATCHER,
  watcher
});

export const deleteWatcher = (groupId: string): DeleteWatcher => ({
  type: DELETE_WATCHER,
  groupId
});

export const toggleWatcherActive = (
  groupId: string,
  active: boolean
): ToggleWatcherActivity => ({
  type: TOGGLE_WATCHER_ACTIVE,
  groupId,
  active
});

export const scheduleWatcher = (
  groupId: string,
  time: Date
): ScheduleWatcherTick => ({
  type: SCHEDULE_NEXT_WATCHER_TICK,
  groupId,
  time
});

export const cancelNextWatcherTick = (groupId: string): CancelWatcherTick => ({
  type: CANCEL_NEXT_WATCHER_TICK,
  groupId
});
