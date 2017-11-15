import { READ_PERSISTED_STATE, READ_BACKUP_FILE } from '../constants';

export interface ReadPersistedState {
  readonly type: READ_PERSISTED_STATE;
}

export interface ReadBackupFile {
  readonly type: READ_BACKUP_FILE;
}

export const readPersistedState = (): ReadPersistedState => ({
  type: READ_PERSISTED_STATE
});

export const readBackupFile = (): ReadBackupFile => ({
  type: READ_BACKUP_FILE
});
