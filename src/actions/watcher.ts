import {
  ADD_WATCHER,
  DELETE_WATCHER,
  TOGGLE_WATCHER_ACTIVE
} from '../constants';

export interface AddWatcher {
  type: ADD_WATCHER;
  groupId: string;
}
export interface DeleteWatcher {
  type: DELETE_WATCHER;
  groupId: string;
}

export interface ToggleWatcherActivity {
  type: TOGGLE_WATCHER_ACTIVE;
  groupId: string;
}

export const addWatcher = (groupId: string): AddWatcher => ({
  type: ADD_WATCHER,
  groupId
});

export const deleteWatcher = (groupId: string): DeleteWatcher => ({
  type: DELETE_WATCHER,
  groupId
});

export const toggleWatcherActive = (id: string): ToggleWatcherActivity => ({
  type: TOGGLE_WATCHER_ACTIVE,
  groupId: id
});
