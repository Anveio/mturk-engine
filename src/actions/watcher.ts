import {
  ADD_WATCHER,
  EDIT_WATCHER_FIELD,
  DELETE_WATCHER,
  SCHEDULE_NEXT_WATCHER_TICK,
  CANCEL_NEXT_WATCHER_TICK,
  SET_WATCHER_TIMER
} from '../constants';

import { Watcher } from '../types';

export type EditableWatcherField = keyof Pick<
  Watcher,
  'title' | 'delay' | 'description' | 'folderId' | 'stopAfterFirstSuccess'
>;

export interface AddWatcher {
  readonly type: ADD_WATCHER;
  readonly watcher: Watcher;
}

export interface EditWatcher {
  readonly type: EDIT_WATCHER_FIELD;
  readonly groupId: string;
  readonly field: EditableWatcherField;
  readonly value: string | number;
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

export type WatcherAction =
  | AddWatcher
  | EditWatcher
  | DeleteWatcher
  | ScheduleWatcherTick
  | CancelWatcherTick;

export const addWatcher = (watcher: Watcher): AddWatcher => ({
  type: ADD_WATCHER,
  watcher
});

export const editWatcher = (
  groupId: string,
  field: EditableWatcherField,
  value: string | number
): EditWatcher => ({
  type: EDIT_WATCHER_FIELD,
  groupId,
  field,
  value
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
