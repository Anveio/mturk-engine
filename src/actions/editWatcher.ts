import { EDIT_WATCHER_FIELD } from '../constants';

export type EditableField = 'title' | 'description' | 'delay';

export interface WatcherEdit {
  type: EDIT_WATCHER_FIELD;
  groupId: string;
  field: EditableField;
  value: string | number;
}

export const editWatcher = (
  groupId: string,
  field: EditableField,
  value: string | number
): WatcherEdit => ({
  type: EDIT_WATCHER_FIELD,
  groupId,
  field,
  value
});
