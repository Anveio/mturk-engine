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

export function* handleFileUploadRequest(action: UploadRequest) {
  try {
    const { payload } = action;
    const data: string = yield call(readUploadedFileAsText, payload);
    if (!data) {
      yield put<UploadFailure>(
        uploadFailure(new Error('Failed to read data from file.'))
      );
    }
    const parsedData = parseUploadedBackupFile(data);
    yield put<UploadSuccess>(uploadSuccess(parsedData));
    
  } catch (e) {
    console.warn(e);
    failedUploadToast();
    yield put<UploadFailure>(uploadFailure(e));
  }
}
