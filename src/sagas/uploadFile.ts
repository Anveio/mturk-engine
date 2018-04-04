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
import {
  failedUploadToast,
  showWaitingToast,
  updateTopRightToaster,
  plainToast
} from '../utils/toaster';
import { PersistedState } from '../types';

export function* handleFileUploadRequest(action: UploadRequest) {
  try {
    const { payload } = action;

    const toastKey = showWaitingToast('Uploading your file...');

    const data: string = yield call(readUploadedFileAsText, payload);

    updateTopRightToaster(toastKey, plainToast('File upload complete.'));

    const parsedData: Partial<PersistedState> = parseUploadedBackupFile(data);
    yield put<UploadSuccess>(uploadSuccess(parsedData));
  } catch (e) {
    console.warn(e);
    failedUploadToast();
    yield put<UploadFailure>(uploadFailure(e));
  }
}
