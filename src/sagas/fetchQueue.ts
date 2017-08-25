import { call, put } from 'redux-saga/effects';
import {
  FetchQueueFailure,
  fetchQueueFailure,
  FetchQueueSuccess,
  fetchQueueSuccess
} from '../actions/queue';
import { getQueuePage } from '../utils/fetchQueue';

type FetchQueueResolution = FetchQueueFailure | FetchQueueSuccess;

export function* fetchUserQueue(action: FetchQueueResolution) {
  try {
    console.log('fetchUserQueue was invoked.');
    const queueData = yield call(getQueuePage);
    yield put<FetchQueueSuccess>(fetchQueueSuccess(queueData));
  } catch (e) {
    yield put<FetchQueueFailure>(fetchQueueFailure());
  }
}
