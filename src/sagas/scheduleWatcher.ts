import { delay } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import { RootState, Watcher } from '../types';
import { ScheduleWatcherTick } from '../actions/watcher';
import {
  AcceptHitRequest,
  acceptHitRequestFromWatcher
} from '../actions/accept';

export function* acceptAfterWatcherDelay(action: ScheduleWatcherTick) {
  yield delay(action.time.valueOf() - Date.now());

  const watcher: Watcher = yield select((state: RootState) =>
    state.watchers.get(action.groupId)
  );

  if (watcher.active) {
    yield put<AcceptHitRequest>(
      acceptHitRequestFromWatcher(watcher.groupId, watcher.delay)
    );
  }
}
