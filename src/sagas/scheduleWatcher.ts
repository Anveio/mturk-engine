import { delay } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import { RootState, Watcher, WatcherTimer } from '../types';
import { ScheduleWatcherTick } from '../actions/watcher';
import {
  AcceptHitRequest,
  acceptHitRequestFromWatcher
} from '../actions/accept';

export function* acceptHitAfterWatcherDelay(action: ScheduleWatcherTick) {
  const maybeWatcher: Watcher | undefined = yield select(
    getWatcher(action.groupId)
  );

  const readyToAccept: boolean = yield waitForWatcherDelay(action);

  if (readyToAccept && !!maybeWatcher) {
    return yield put<AcceptHitRequest>(
      acceptHitRequestFromWatcher(maybeWatcher.groupId, maybeWatcher.delay)
    );
  }
}

function* waitForWatcherDelay(action: ScheduleWatcherTick) {
  yield delay(action.delayInSeconds * 1000);
  /**
   * It's possible that a watcher is deleted during the delay.
   */
  const watcher: Watcher | undefined = yield select((state: RootState) =>
    state.watchers.get(action.groupId)
  );

  /**
   * It's possible that a watcher is cancelled during the delay.
   */
  const watcherTimer: WatcherTimer | undefined = yield select(
    (state: RootState) => state.watcherTimes.get(action.groupId)
  );

  /**
   * If the origin of the watcher after the delay and the origin from the action
   * are not the same, that means the user cancelled the original watcher and
   * restarted it during the delay. In that case, return false.
   */

  if (watcher && watcherTimer && watcherTimer.origin === action.origin) {
    return yield true;
  } else {
    return yield false;
  }
}

const getWatcher = (id: string) => (state: RootState) => state.watchers.get(id);
