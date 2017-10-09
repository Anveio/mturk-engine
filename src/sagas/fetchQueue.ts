import { call, put } from 'redux-saga/effects';
import {
  FetchQueueRequest,
  FetchQueueFailure,
  fetchQueueFailure,
  FetchQueueSuccess,
  fetchQueueSuccess
} from '../actions/queue';
import { getQueuePage } from '../api/queue';
import { generateQueueToast, failedQueueToast } from '../utils/toaster';

export function* fetchUserQueue(action: FetchQueueRequest) {
  try {
    const queueData = yield call(getQueuePage);

    generateQueueToast(!queueData.isEmpty());

    yield put<FetchQueueSuccess>(fetchQueueSuccess(queueData));
  } catch (e) {
    failedQueueToast();
    yield put<FetchQueueFailure>(fetchQueueFailure());
  }
}
