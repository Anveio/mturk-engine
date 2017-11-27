import { call } from 'redux-saga/effects';
import { ReadPersistedState, WritePersistedState } from '../actions/backup';
import {
  persistedStateToJsonString,
  generateBackupBlob,
  createTemporaryDownloadLink,
  writeToPersistedState
} from '../utils/backup';

export function* downloadPersistedState(action: ReadPersistedState) {
  try {
    const stateString: string = yield call(persistedStateToJsonString);
    const persistedStateBlob = generateBackupBlob(stateString);
    const temporaryAnchor = createTemporaryDownloadLink(persistedStateBlob);
    temporaryAnchor.click();
  } catch (e) {
    console.warn(e);
  }
}

export function* importPersistedState(action: WritePersistedState) {
  try {
    yield call(writeToPersistedState, action.payload);
    location = location;
  } catch (e) {
    console.warn(e);
  }
}
