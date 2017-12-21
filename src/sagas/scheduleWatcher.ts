import { delay } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import { RootState, Watcher } from '../types';
import { ScheduleWatcherTick } from '../actions/watcher';
import {
  AcceptHitRequest,
  acceptHitRequestFromWatcher
} from '../actions/accept';

export function* acceptAfterWatcherDelay(action: ScheduleWatcherTick) {
  yield delay(action.delayInSeconds * 1000);
  /**
   * It's possible that a watcher is deleted during the delay.
   */
  const watcher: Watcher | undefined = yield select((state: RootState) =>
    state.watchers.get(action.groupId)
  );

  const watcherTime: Date | undefined = yield select((state: RootState) =>
    state.watcherTimes.get(action.groupId)
  );

  if (watcher && watcherTime) {
    yield put<AcceptHitRequest>(
      acceptHitRequestFromWatcher(watcher.groupId, watcher.delay)
    );
  }
}
