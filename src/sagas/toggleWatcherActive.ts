import { put, select } from 'redux-saga/effects';
import { RootState } from '../types';
import { SearchRequest, searchRequestContinuous } from '../actions/search';
import { ToggleWatcherActivity } from '../actions/watcher';
import { CancelNextSearch, cancelNextSearch } from '../actions/scheduler';

export function* toggleSearchActive(action: ToggleWatcherActivity) {
  const watcherActive: boolean = yield select(
    (state: RootState) => state.watchers.get(action.groupId).active
  );

  if (watcherActive) {
    yield put<SearchRequest>(searchRequestContinuous());
  } else {
    yield put<CancelNextSearch>(cancelNextSearch());
  }
}
