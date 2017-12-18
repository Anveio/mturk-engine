import { call, put } from 'redux-saga/effects';
import {
  AcceptHitRequest,
  acceptHitFailure,
  AcceptHitFailure,
  acceptHitSuccess,
  AcceptHitSuccess
} from '../actions/accept';
import { ScheduleWatcherTick, scheduleWatcher } from '../actions/watcher';
import { sendHitAcceptRequest, HitAcceptResponse } from '../api/acceptHit';
import { successfulAcceptToast, failedAcceptToast } from '../utils/toaster';
import { calculateTimeFromDelay } from '../utils/scheduler';
import { parseWorkerHit } from '../utils/parsingWorkerHit';
import { parseAcceptFailureReason } from '../utils/parsing';

export function* acceptHit(action: AcceptHitRequest) {
  try {
    const response: HitAcceptResponse = yield call(
      sendHitAcceptRequest,
      action.groupId
    );

    const { successful, htmlResponse } = response;

    yield successful
      ? handleSuccessfulAccept(htmlResponse)
      : handleFailedAccept(htmlResponse, action.fromWatcher);

    if (action.fromWatcher && action.delay) {
      yield put<ScheduleWatcherTick>(
        scheduleWatcher(action.groupId, calculateTimeFromDelay(action.delay))
      );
    }
  } catch (e) {
    yield put<AcceptHitFailure>(acceptHitFailure());
  }
}

function* handleSuccessfulAccept(html: Document) {
  try {
    const acceptedHit = parseWorkerHit(html);
    successfulAcceptToast(acceptedHit.title);
    yield put<AcceptHitSuccess>(acceptHitSuccess(acceptedHit));
  } catch (e) {
    /**
     * Even if there is an error at this point, the hit was successfuly accepted.
     */
    successfulAcceptToast('A hit');
  }
}

function* handleFailedAccept(html: Document, fromWatcher: boolean) {
  const failureReason = parseAcceptFailureReason(html);

  if (fromWatcher && failureReason !== 'CAPTCHA') {
    /**
     * Users don't want to see a toast when a watcher fails to accept a HIT,
     * unless it results in a CAPTCHA.
     */
    return yield put<AcceptHitFailure>(acceptHitFailure());
  } else {
    failedAcceptToast(failureReason);
    return yield put<AcceptHitFailure>(acceptHitFailure());
  }
}
