import { call, put, select } from 'redux-saga/effects';
import {
  acceptHitFailure,
  AcceptHitFailure,
  acceptHitSuccess,
  AcceptHitSuccess,
  AcceptHitRequestFromWatcher
} from '../actions/accept';
import {
  ScheduleWatcherTick,
  scheduleWatcher,
  CancelWatcherTick,
  cancelNextWatcherTick
} from '../actions/watcher';
import { sendHitAcceptRequest, HitAcceptResponse } from '../api/acceptHit';
import { successfulAcceptToast } from '../utils/toaster';
// import { parseWorkerHit } from '../utils/parsingWorkerHit';
// import { parseAcceptFailureReason } from '../utils/parsing';
import { RootState, Watcher } from '../types';
import { TopRightToaster } from '../index';
import { blankQueueItem } from '../utils/queueItem';
import { getWatcher } from '../selectors/watchers';

export function* acceptHitFromWatcher(action: AcceptHitRequestFromWatcher) {
  try {
    const response: HitAcceptResponse = yield call(
      sendHitAcceptRequest,
      action.groupId
    );

    const { successful } = response;

    const watcher: Watcher | undefined = yield select(
      getWatcher(action.groupId)
    );

    return yield successful
      ? handleSuccessfulAccept(action, watcher)
      : handleFailedAccept(action, watcher);
  } catch (e) {
    yield put<AcceptHitFailure>(acceptHitFailure());
    yield put<CancelWatcherTick>(cancelNextWatcherTick(action.groupId));
  }
}

function* handleSuccessfulAccept(
  action: AcceptHitRequestFromWatcher,
  watcher?: Watcher
) {
  try {
    TopRightToaster.show(successfulAcceptToast());
    yield put<AcceptHitSuccess>(
      acceptHitSuccess(blankQueueItem(action.groupId))
    );

    /**
     * If a user deletes a watcher before the request resolves, don't schedule it.
     */
    if (watcher && !watcher.stopAfterFirstSuccess) {
      return yield handleWatcherScheduling(watcher);
    }

    yield put<CancelWatcherTick>(cancelNextWatcherTick(action.groupId));
  } catch (e) {
    /**
     * Even if there is an error at this point, the hit was successfuly accepted.
     */
    TopRightToaster.show(successfulAcceptToast());
  }
}

function* handleFailedAccept(
  action: AcceptHitRequestFromWatcher,
  watcher?: Watcher
) {
  yield put<AcceptHitFailure>(acceptHitFailure());

  if (watcher) {
    return yield handleWatcherScheduling(watcher);
  }

  yield put<CancelWatcherTick>(cancelNextWatcherTick(action.groupId));
}

function* handleWatcherScheduling(watcher: Watcher) {
  /**
   * If a user cancels a watcher before the request resolves, don't schedule it.
   */
  const watcherActive: boolean = yield select(
    (state: RootState) => !!state.watcherTimes.get(watcher.groupId)
  );

  if (watcher && watcherActive) {
    yield put<ScheduleWatcherTick>(scheduleWatcher(watcher.groupId));
  }
}
