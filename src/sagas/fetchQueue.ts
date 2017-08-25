import { call, put } from 'redux-saga/effects';
import {
  FetchQueueFailure,
  fetchQueueFailure,
  FetchQueueSuccess,
  fetchQueueSuccess
} from '../actions/queue';
import { getQueuePage } from '../utils/fetchQueue';
import { generateQueueToast, failedQueueToast } from '../utils/toastr';

type FetchQueueResolution = FetchQueueFailure | FetchQueueSuccess;

export function* fetchUserQueue(action: FetchQueueResolution) {
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
