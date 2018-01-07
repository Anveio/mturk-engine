import { call, select } from 'redux-saga/effects';
import { ReadPersistedState, WritePersistedState } from '../actions/backup';
import {
  persistedStateToJsonString,
  generateBackupBlob,
  createTemporaryDownloadLink,
  writeToPersistedState,
  downloadTemporaryAnchor,
  keepOnlyCheckedStateKeys
} from '../utils/backup';
import {
  failedImportPersistedState,
  failedDownloadStateToast,
  successfulDownloadStateToast
} from '../utils/toaster';
import { PersistedState } from '../types';
import { uploadedStateSelector } from '../selectors/uploadedState';
import { refreshPage } from '../utils/refresh';

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
    const uploadedState: Partial<PersistedState> | null = yield select(
      uploadedStateSelector
    );
    const stateToImport: Partial<PersistedState> = keepOnlyCheckedStateKeys(
      action.whiteList
    )(uploadedState);
    yield call(writeToPersistedState, stateToImport);
    refreshPage();
  } catch (e) {
    console.warn(e);
    failedImportPersistedState();
  }
}
