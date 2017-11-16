import { call } from 'redux-saga/effects';
import { ReadPersistedState } from '../actions/backup';
import {
  persistedStateToJsonString,
  generateBackupBlob,
  createTemporaryDownloadLink
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
