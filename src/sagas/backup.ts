import { call } from 'redux-saga/effects';
import { ReadPersistedState } from '../actions/backup';
import {
  persistedStateToStringArray,
  generateBackupBlob,
  createTemporaryDownloadLink
} from '../utils/backup';

export function* downloadPersistedState(action: ReadPersistedState) {
  try {
    const stateStringArray: string[] = yield call(persistedStateToStringArray);
    const persistedStateBlob = generateBackupBlob(stateStringArray);
    const temporaryAnchor = createTemporaryDownloadLink(persistedStateBlob);
    temporaryAnchor.click();
  } catch (e) {
    console.warn(e);
  }
}
