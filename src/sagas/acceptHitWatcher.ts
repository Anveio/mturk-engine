import { call, put, select } from 'redux-saga/effects';
import {
  AcceptHitRequest,
  acceptHitFailure,
  AcceptHitFailure,
  acceptHitSuccess,
  AcceptHitSuccess
} from '../actions/accept';
import {
  ScheduleWatcherTick,
  scheduleWatcher,
  CancelWatcherTick,
  cancelNextWatcherTick
} from '../actions/watcher';
import { sendHitAcceptRequest, HitAcceptResponse } from '../api/acceptHit';
import { successfulAcceptToast } from '../utils/toaster';
import { parseWorkerHit } from '../utils/parsingWorkerHit';
// import { parseAcceptFailureReason } from '../utils/parsing';
import { RootState } from '../types';
import { TopRightToaster } from '../index';

export function* acceptHitFromWatcher(action: AcceptHitRequest) {
  try {
    const response: HitAcceptResponse = yield call(
      sendHitAcceptRequest,
      action.groupId
    );

    const { successful, htmlResponse } = response;

    yield successful
      ? handleSuccessfulAccept(htmlResponse)
      : yield put<AcceptHitFailure>(acceptHitFailure());

    if (action.fromWatcher && action.delay) {
      yield handleWatcherScheduling(action.groupId, action.delay);
    }
  } catch (e) {
    yield put<AcceptHitFailure>(acceptHitFailure());
    yield put<CancelWatcherTick>(cancelNextWatcherTick(action.groupId));
  }
}

function* handleSuccessfulAccept(html: Document) {
  try {
    const acceptedHit = parseWorkerHit(html);
    TopRightToaster.show(successfulAcceptToast(acceptedHit.title));
    yield put<AcceptHitSuccess>(acceptHitSuccess(acceptedHit));
  } catch (e) {
    /**
     * Even if there is an error at this point, the hit was successfuly accepted.
     */
    TopRightToaster.show(successfulAcceptToast('A hit'));
  }
}

function* handleWatcherScheduling(id: string, delay: number) {
  /**
   * If a user cancels a watcher during the request process, we don't want to
   * reschedule it again.
   */

  const watcherActive: boolean = yield select(
    (state: RootState) => !!state.watcherTimes.get(id)
  );

  if (watcherActive) {
    yield put<ScheduleWatcherTick>(scheduleWatcher(id, delay));
  }
}
