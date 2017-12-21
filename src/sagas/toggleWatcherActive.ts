import { put, select } from 'redux-saga/effects';
import { RootState, Watcher } from '../types';
import {
  AcceptHitRequest,
  acceptHitRequestFromWatcher
} from '../actions/accept';
import {
  ToggleWatcherActivity,
  CancelWatcherTick,
  cancelNextWatcherTick
} from '../actions/watcher';

export function* toggleWatcherActive(action: ToggleWatcherActivity) {
  const watcher: Watcher = yield select((state: RootState) =>
    state.watchers.get(action.groupId)
  );

  const watcherActive: boolean = yield select(
    (state: RootState) => !!state.watcherTimes.get(action.groupId)
  );

  if (watcherActive) {
    yield put<AcceptHitRequest>(
      acceptHitRequestFromWatcher(action.groupId, watcher.delay)
    );
  } else {
    yield put<CancelWatcherTick>(cancelNextWatcherTick(watcher.groupId));
  }
}
