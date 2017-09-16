import { put, select } from 'redux-saga/effects';
import { RootState } from '../types';
import {
  AcceptHitRequest,
  acceptHitRequestFromWatcher
} from '../actions/accept';
import { ToggleWatcherActivity } from '../actions/watcher';
import { CancelNextSearch, cancelNextSearch } from '../actions/scheduler';

export function* toggleWatcherActive(action: ToggleWatcherActivity) {
  const watcher = yield select((state: RootState) =>
    state.watchers.get(action.groupId)
  );

  if (watcher.active) {
    yield put<AcceptHitRequest>(
      acceptHitRequestFromWatcher(action.groupId, watcher.delay)
    );
  } else {
    yield put<CancelNextSearch>(cancelNextSearch());
  }
}
