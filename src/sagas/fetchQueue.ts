import { call, put } from 'redux-saga/effects';
import {
  FetchQueueRequest,
  FetchQueueFailure,
  fetchQueueFailure,
  FetchQueueSuccess,
  fetchQueueSuccess
} from '../actions/queue';
import { getQueuePage } from '../api/queue';
import {
  generateQueueToast,
  failedQueueToast,
  updateTopRightToaster,
  showWaitingToast
} from '../utils/toaster';
import { QueueMap } from '../types';

export function* fetchUserQueue(action: FetchQueueRequest) {
  const toasterKey = showWaitingToast('Fetching your queue...');
  try {
    const queuePageData: QueueMap = yield call(getQueuePage);

    updateTopRightToaster(
      toasterKey,
      generateQueueToast(!queuePageData.isEmpty())
    );

    yield put<FetchQueueSuccess>(fetchQueueSuccess(queuePageData));
  } catch (e) {
    updateTopRightToaster(toasterKey, failedQueueToast);
    yield put<FetchQueueFailure>(fetchQueueFailure());
  }
}
