import { call, put, select } from 'redux-saga/effects';
import { RootState, SearchResults, SearchOptions } from '../types';
import {
  SearchRequest,
  SearchFailure,
  searchFailure,
  searchSuccess,
  SearchSuccess
} from '../actions/search';
import { ScheduleNextSearch, scheduleSearch } from '../actions/scheduler';
import {
  FetchTOpticonRequest,
  fetchTOpticonRequest
} from '../actions/turkopticon';
import { searchHits } from '../api/search';
import { selectHitRequester } from '../utils/turkopticon';
import { calculateNextSearchTime } from '../utils/scheduler';

export const getSearchOptions = (state: RootState) => state.searchOptions;

export function* fetchSearchResults(action: SearchRequest) {
  try {
    const options: SearchOptions = yield select(getSearchOptions);
    const hitData: SearchResults = yield call(searchHits, options);

    const empty = hitData.isEmpty();

    empty
      ? yield put<SearchFailure>(searchFailure())
      : yield put<SearchSuccess>(searchSuccess(hitData));

    if (!empty) {
      yield put<FetchTOpticonRequest>(
        fetchTOpticonRequest(hitData.map(selectHitRequester).toArray())
      );
    }

    if (action.continuous) {
      yield put<ScheduleNextSearch>(
        scheduleSearch(calculateNextSearchTime(+options.delay))
      );
    }
  } catch (e) {
    yield put<SearchFailure>(searchFailure());
  }
}
