import { call, put } from 'redux-saga/effects';
import {
  UploadRequest,
  UploadSuccess,
  UploadFailure,
  uploadFailure,
  uploadSuccess
} from '../actions/upload';
import {
  readUploadedFileAsText,
  parseUploadedBackupFile
} from '../utils/backup';
import { failedUploadToast } from '../utils/toaster';
import { PersistedState } from '../types';
import {
  createProgressToast,
  updateProgressToast
} from '../utils/uploadToaster';

export function* handleFileUploadRequest(action: UploadRequest) {
  try {
    const { payload } = action;

    const toastKey = createProgressToast();

    const data: string = yield call(readUploadedFileAsText, payload);

    updateProgressToast(toastKey, 100);

    const parsedData: Partial<PersistedState> = parseUploadedBackupFile(data);
    yield put<UploadSuccess>(uploadSuccess(parsedData));
  } catch (e) {
    console.warn(e);
    failedUploadToast();
    yield put<UploadFailure>(uploadFailure(e));
  }
}
