import { START_WATCHER, STOP_WATCHER } from '../constants';

export interface StartWatcher {
  type: START_WATCHER;
  groupId: string;
}
export interface StopWatcher {
  type: STOP_WATCHER;
  groupId: string;
}

export const startWatcher = (groupId: string): StartWatcher => ({
  type: START_WATCHER,
  groupId
});

export const stopWatcher = (groupId: string): StopWatcher => ({
  type: STOP_WATCHER,
  groupId
});
