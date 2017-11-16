import { call, put } from 'redux-saga/effects';
import {
  UploadRequest,
  UploadSuccess,
  UploadFailure,
  uploadFailure,
  uploadSuccess
} from '../actions/upload';
import { uploadDataFromFile } from '../utils/backup';

export function* handleFileUploadRequest(action: UploadRequest) {
  try {
    const { payload } = action;
    const data = yield call(uploadDataFromFile, payload);
    // console.log('Data: ' + data);
    data
      ? yield put<UploadSuccess>(uploadSuccess(data))
      : yield put<UploadFailure>(
          uploadFailure(new Error('Failed to read data from file.'))
        );
  } catch (e) {
    console.warn(e);
    yield put<UploadFailure>(uploadFailure(e));
  }
}
