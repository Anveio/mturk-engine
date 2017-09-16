import { delay } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import { RootState, Watcher } from '../types';
import { ScheduleWatcherTick } from '../actions/watcher';
import {
  AcceptHitRequest,
  AcceptHitFailure,
  acceptHitFailure,
  acceptHitRequestFromWatcher
} from '../actions/accept';

export function* acceptAfterWatcherDelay(action: ScheduleWatcherTick) {
  yield delay(action.time.valueOf() - Date.now());

  /**
   * It's possible that a watcher is deleted during the delay.
   */
  const watcher: Watcher | undefined = yield select((state: RootState) =>
    state.watchers.get(action.groupId)
  );

  try {
    if (watcher && watcher.active) {
      yield put<AcceptHitRequest>(
        acceptHitRequestFromWatcher(watcher.groupId, watcher.delay)
      );
    }
  } catch (e) {
    yield put<AcceptHitFailure>(acceptHitFailure());
  }
}
