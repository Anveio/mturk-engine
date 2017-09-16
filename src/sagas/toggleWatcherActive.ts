import { put, select } from 'redux-saga/effects';
import { RootState } from '../types';
import {
  AcceptHitRequest,
  acceptHitRequestFromWatcher
} from '../actions/accept';
import { ToggleWatcherActivity } from '../actions/watcher';
import { CancelNextSearch, cancelNextSearch } from '../actions/scheduler';

export function* toggleWatcherActive(action: ToggleWatcherActivity) {
  const watcherDelay = yield select(
    (state: RootState) => state.watchers.get(action.groupId).delay
  );

  if (action.active) {
    yield put<AcceptHitRequest>(
      acceptHitRequestFromWatcher(action.groupId, watcherDelay)
    );
  } else {
    yield put<CancelNextSearch>(cancelNextSearch());
  }
}
