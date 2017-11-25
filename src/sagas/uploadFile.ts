import { call, put } from 'redux-saga/effects';
import {
  UploadRequest,
  UploadSuccess,
  UploadFailure,
  uploadFailure,
  uploadSuccess
} from '../actions/upload';
import { readUploadedFileAsText } from '../utils/backup';
import { PersistedState } from '../types';
import { failedUploadToast } from '../utils/toaster';

export function* handleFileUploadRequest(action: UploadRequest) {
  try {
    const { payload } = action;
    const data: string = yield call(readUploadedFileAsText, payload);
    if (!data) {
      yield put<UploadFailure>(
        uploadFailure(new Error('Failed to read data from file.'))
      );
    }
    const parsedData: Partial<PersistedState> = JSON.parse(data);
    yield put<UploadSuccess>(uploadSuccess(parsedData));
  } catch (e) {
    console.warn(e);
    failedUploadToast();
    yield put<UploadFailure>(uploadFailure(e));
  }
}
