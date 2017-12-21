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
import { parseWorkerHit } from '../utils/parsingWorkerHit';
import { acceptHitFromWatcher } from './acceptHitWatcher';

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

    const { successful, htmlResponse } = response;

    yield successful
      ? handleSuccessfulAccept(htmlResponse, toasterKey)
      : handleFailedAccept(toasterKey);
  } catch (e) {
    yield put<AcceptHitFailure>(acceptHitFailure());
    updateTopRightToaster(toasterKey, errorAcceptToast);
  }
}

function* handleSuccessfulAccept(html: Document, key: string) {
  try {
    const acceptedHit = parseWorkerHit(html);
    updateTopRightToaster(key, successfulAcceptToast(acceptedHit.title));
    yield put<AcceptHitSuccess>(acceptHitSuccess(acceptedHit));
  } catch (e) {
    /**
     * Even if there is an error at this point, the hit was successfuly accepted.
     */
    updateTopRightToaster(key, successfulAcceptToast('A hit'));
  }
}

function* handleFailedAccept(key: string) {
  yield put<AcceptHitFailure>(acceptHitFailure());
  updateTopRightToaster(key, failedAcceptToast('UNKNOWN'));
}
