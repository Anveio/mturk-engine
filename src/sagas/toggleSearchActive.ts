import { put, select } from 'redux-saga/effects';
import { RootState } from '../types';
import { SearchRequest, searchRequestContinuous } from '../actions/search';
import { ToggleSearchActive } from '../actions/searchActivity';
import { CancelNextSearch, cancelNextSearch } from '../actions/scheduler';

export function* toggleSearchActive(action: ToggleSearchActive) {
  const searchingActive = yield select(
    (state: RootState) => state.searchingActive
  );

  if (searchingActive) {
    yield put<SearchRequest>(searchRequestContinuous());
  } else {
    yield put<CancelNextSearch>(cancelNextSearch());
  }
}
