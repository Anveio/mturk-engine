import { call, put } from 'redux-saga/effects';
import {
  FetchQueueRequest,
  FetchQueueFailure,
  fetchQueueFailure,
  FetchQueueSuccess,
  fetchQueueSuccess
} from '../actions/queue';
import { getQueuePage } from '../utils/fetchQueue';
import { generateQueueToast, failedQueueToast } from '../utils/toastr';

export function* fetchUserQueue(action: FetchQueueRequest) {
  try {
    const queueData = yield call(getQueuePage);
    const empty = !queueData.isEmpty();
    generateQueueToast(empty);
    yield put<FetchQueueSuccess>(fetchQueueSuccess(queueData));
  } catch (e) {
    failedQueueToast();
    yield put<FetchQueueFailure>(fetchQueueFailure());
  }
}
