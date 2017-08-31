import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { SearchRequest, searchRequest } from '../actions/search';
import { ScheduleNextSearch } from '../actions/scheduler';

export function* searchAfterDelay(action: ScheduleNextSearch) {
  try {
    yield delay(action.time.valueOf() - Date.now());
    yield put<SearchRequest>(searchRequest());
  } catch (e) {}
}
