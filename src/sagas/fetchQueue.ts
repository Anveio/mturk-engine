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
  createGenericWaitingToast
} from '../utils/toaster';
import { QueueMap } from '../types';

export function* fetchUserQueue(action: FetchQueueRequest) {
  try {
    const toasterKey = createGenericWaitingToast('Fetching your queue...');

    const queuePageData: QueueMap = yield call(getQueuePage);

    updateTopRightToaster(
      toasterKey,
      generateQueueToast(!queuePageData.isEmpty())
    );

    yield put<FetchQueueSuccess>(fetchQueueSuccess(queuePageData));
  } catch (e) {
    failedQueueToast();
    yield put<FetchQueueFailure>(fetchQueueFailure());
  }
}
