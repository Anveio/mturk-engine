import { call } from 'redux-saga/effects';
import { ReadPersistedState, WritePersistedState } from '../actions/backup';
import {
  persistedStateToJsonString,
  generateBackupBlob,
  createTemporaryDownloadLink,
  writeToPersistedState,
  downloadTemporaryAnchor
} from '../utils/backup';
import {
  failedImportPersistedState,
  failedDownloadStateToast,
  successfulDownloadStateToast
} from '../utils/toaster';

export function* downloadPersistedState(action: ReadPersistedState) {
  try {
    const stateString: string = yield call(persistedStateToJsonString);
    const persistedStateBlob = generateBackupBlob(stateString);
    const temporaryAnchor = createTemporaryDownloadLink(persistedStateBlob);
    downloadTemporaryAnchor(temporaryAnchor);
    successfulDownloadStateToast();
  } catch (e) {
    console.warn(e);
    failedDownloadStateToast();
  }
}

export function* importPersistedState(action: WritePersistedState) {
  try {
    yield call(writeToPersistedState, action.payload);
    location = location;
  } catch (e) {
    console.warn(e);
    failedImportPersistedState();
  }
}
