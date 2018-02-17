import { EDIT_WATCHER_FIELD } from '../constants';

export type EditableField = 'title' | 'description' | 'delay' | 'folderId';

export interface WatcherEdit {
  readonly type: EDIT_WATCHER_FIELD;
  readonly groupId: string;
  readonly field: EditableField;
  readonly value: string | number;
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
