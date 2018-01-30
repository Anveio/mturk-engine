import { delay } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import { RootState, Watcher, WatcherTimer } from '../types';
import { ScheduleWatcherTick } from '../actions/watcher';
import {
  AcceptHitRequest,
  acceptHitRequestFromWatcher
} from '../actions/accept';

export function* acceptAfterWatcherDelay(action: ScheduleWatcherTick) {
  const origin = action.origin;
  yield delay(action.delayInSeconds * 1000);
  /**
   * It's possible that a watcher is deleted during the delay.
   */
  const watcher: Watcher | undefined = yield select((state: RootState) =>
    state.watchers.get(action.groupId)
  );

  const watcherTimer: WatcherTimer | undefined = yield select(
    (state: RootState) => state.watcherTimes.get(action.groupId)
  );

  if (watcher && watcherTimer && watcherTimer.origin === origin) {
    yield put<AcceptHitRequest>(
      acceptHitRequestFromWatcher(watcher.groupId, watcher.delay)
    );
  }
}
