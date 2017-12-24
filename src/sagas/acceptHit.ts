import { call, put } from 'redux-saga/effects';
import {
  AcceptHitRequest,
  acceptHitFailure,
  AcceptHitFailure,
  acceptHitSuccess,
  AcceptHitSuccess
} from '../actions/accept';
import { sendHitAcceptRequest, HitAcceptResponse } from '../api/acceptHit';
import {
  successfulAcceptToast,
  createGenericWaitingToast,
  updateTopRightToaster,
  errorAcceptToast,
  failedAcceptToast
} from '../utils/toaster';
// import { parseWorkerHit } from '../utils/parsingWorkerHit';
import { acceptHitFromWatcher } from './acceptHitWatcher';
import { blankQueueItem } from '../utils/queueItem';

export function* acceptHit(action: AcceptHitRequest) {
  if (action.fromWatcher) {
    return yield acceptHitFromWatcher(action);
  }

  const toasterKey = createGenericWaitingToast(`Accepting HIT...`);
  try {
    const response: HitAcceptResponse = yield call(
      sendHitAcceptRequest,
      action.groupId
    );

    const { successful } = response;

    yield successful
      ? handleSuccessfulAccept(action.groupId, toasterKey)
      : handleFailedAccept(toasterKey, action.groupId);
  } catch (e) {
    yield put<AcceptHitFailure>(acceptHitFailure());
    updateTopRightToaster(toasterKey, errorAcceptToast);
  }
}

function* handleSuccessfulAccept(groupId: string, key: string) {
  try {
    updateTopRightToaster(key, successfulAcceptToast('A hit'));
    yield put<AcceptHitSuccess>(acceptHitSuccess(blankQueueItem(groupId)));
  } catch (e) {
    /**
     * Even if there is an error at this point, the hit was successfuly accepted.
     */
    updateTopRightToaster(key, successfulAcceptToast('A hit'));
  }
}

function* handleFailedAccept(key: string, groupId: string) {
  yield put<AcceptHitFailure>(acceptHitFailure());
  updateTopRightToaster(key, failedAcceptToast(groupId));
}
