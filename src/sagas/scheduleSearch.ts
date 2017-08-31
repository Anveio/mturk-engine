import { delay } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import { RootState } from '../types';
import { SearchRequest, searchRequest } from '../actions/search';
import { ScheduleNextSearch } from '../actions/scheduler';

export function* searchAfterDelay(action: ScheduleNextSearch) {
  yield delay(action.time.valueOf() - Date.now());
  const searchingActive = yield select(
    (state: RootState) => state.searchingActive
  );

  if (searchingActive) {
    yield put<SearchRequest>(searchRequest());
  }
}
