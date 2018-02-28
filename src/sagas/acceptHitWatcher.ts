import { call, put, select } from 'redux-saga/effects';
import {
  acceptHitFailureFromWatcher,
  AcceptHitFailure,
  AcceptHitSuccess,
  AcceptHitRequestFromWatcher,
  acceptHitSuccessFromWatcher
} from '../actions/accept';
import {
  ScheduleWatcherTick,
  scheduleWatcher,
  CancelWatcherTick,
  cancelNextWatcherTick
} from '../actions/watcher';
import { sendHitAcceptRequest, HitAcceptResponse } from '../api/acceptHit';
import { successfulAcceptToast } from '../utils/toaster';
import { RootState, Watcher } from '../types';
import { TopRightToaster } from '../index';
import { blankQueueItem } from '../utils/queueItem';
import { getWatcher } from '../selectors/watchers';
import { PlayAudio, playAudioFile } from '../actions/audio';
import { AudioSources } from '../constants/audio';

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
    yield put<AcceptHitFailure>(acceptHitFailureFromWatcher(action.groupId));
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
      acceptHitSuccessFromWatcher(blankQueueItem(action.groupId))
    );

    if (watcher && watcher.playSoundAfterSuccess) {
      yield put<PlayAudio>(
        playAudioFile(AudioSources.SUCCESSFUL_WATCHER_ACCEPT)
      );
    }

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
  yield put<AcceptHitFailure>(acceptHitFailureFromWatcher(action.groupId));

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
