import { EDIT_WATCHER_FIELD } from '../constants';
import { Watcher } from '../types';

export interface WatcherEdit {
  type: EDIT_WATCHER_FIELD;
  groupId: string;
  field: keyof Watcher;
  value: string | number;
}

export const editWatcher = (
  groupId: string,
  field: keyof Watcher,
  value: string | number
): WatcherEdit => ({
  type: EDIT_WATCHER_FIELD,
  groupId,
  field,
  value
});
