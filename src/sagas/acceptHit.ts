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
import { generateAcceptHitToast } from '../utils/toaster';
import { calculateTimeFromDelay } from '../utils/scheduler';
import { parseWorkerHit } from '../utils/parsingWorkerHit';

export function* acceptHit(action: AcceptHitRequest) {
  try {
    const response: HitAcceptResponse = yield call(
      sendHitAcceptRequest,
      action.groupId
    );

    const { successful, htmlResponse } = response;

    yield successful
      ? handleSuccessfulAccept(htmlResponse)
      : handleFailedAccept(action.fromWatcher);

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
  const acceptedHit = parseWorkerHit(html);
  generateAcceptHitToast(true, acceptedHit.title);
  yield put<AcceptHitSuccess>(acceptHitSuccess(acceptedHit));
}

function* handleFailedAccept(fromWatcher: boolean) {
  if (!fromWatcher) {
    generateAcceptHitToast(false);
  }

  yield put<AcceptHitFailure>(acceptHitFailure());
}
