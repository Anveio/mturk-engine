import { ApiRateLimitExceeded, watcherExceededApiLimit } from 'actions/api';
import { call, put, select } from 'redux-saga/effects';
import {
  AcceptHitFailure,
  AcceptHitRequestFromWatcher,
  AcceptHitSuccess,
  acceptHitFailureFromWatcher,
  acceptHitSuccessFromWatcher
} from '../actions/accept';
import { PlayAudio, playWatcherSuccessAudio } from '../actions/audio';
import {
  CancelWatcherTick,
  ScheduleWatcherTick,
  cancelNextWatcherTick,
  scheduleWatcher
} from '../actions/watcher';
import { HitAcceptResponse, sendHitAcceptRequest } from '../api/acceptHit';
import { RootState, Watcher } from '../types';
import { blankQueueItem } from '../utils/queueItem';
import {
  sendToTopRightToaster,
  watcherExceededApiLimitToast,
  successfulWatcherAcceptToast
} from '../utils/toaster';

export function* acceptHitFromWatcher(action: AcceptHitRequestFromWatcher) {
  try {
    const response: HitAcceptResponse = yield call(
      sendHitAcceptRequest,
      action.groupId
    );

    const { successful, rateLimitExceeded } = response;

    return yield successful
      ? handleSuccessfulAccept(action)
      : handleFailedAccept(action, rateLimitExceeded);
  } catch (e) {
    yield put<AcceptHitFailure>(acceptHitFailureFromWatcher(action.groupId));
    yield put<CancelWatcherTick>(cancelNextWatcherTick(action.groupId));
  }
}

function* handleSuccessfulAccept({
  watcher,
  groupId
}: AcceptHitRequestFromWatcher) {
  try {
    sendToTopRightToaster(successfulWatcherAcceptToast(watcher.title));
    yield put<AcceptHitSuccess>(
      acceptHitSuccessFromWatcher(blankQueueItem(groupId))
    );

    if (watcher && watcher.playSoundAfterSuccess) {
      yield put<PlayAudio>(playWatcherSuccessAudio());
    }

    /**
     * If a user deletes a watcher before the request resolves, don't schedule it.
     */
    if (watcher && !watcher.stopAfterFirstSuccess) {
      return yield handleWatcherScheduling(watcher, Date.now());
    }

    yield put<CancelWatcherTick>(cancelNextWatcherTick(groupId));
  } catch (e) {
    /**
     * Even if there is an error at this point, the hit was successfuly accepted.
     */
    sendToTopRightToaster(successfulWatcherAcceptToast(watcher.title));
  }
}

function* handleFailedAccept(
  { groupId, watcher }: AcceptHitRequestFromWatcher,
  rateLimitExceeded: boolean
) {
  yield put<AcceptHitFailure>(acceptHitFailureFromWatcher(groupId));

  if (!watcher) {
    return yield put<CancelWatcherTick>(cancelNextWatcherTick(groupId));
  }

  if (rateLimitExceeded) {
    watcherExceededApiLimitToast(watcher.title);
    return yield put<ApiRateLimitExceeded>(watcherExceededApiLimit(groupId));
  }

  return yield handleWatcherScheduling(watcher, Date.now());
}

function* handleWatcherScheduling(watcher: Watcher, origin: number) {
  /**
   * If a user cancels a watcher before the request resolves, don't schedule it.
   */
  const watcherActive: boolean = yield select((state: RootState) =>
    state.watcherTimers.has(watcher.groupId)
  );

  if (watcher && watcherActive) {
    yield put<ScheduleWatcherTick>(scheduleWatcher(watcher.groupId, origin));
  }
}
