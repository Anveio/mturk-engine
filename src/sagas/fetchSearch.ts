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
import { calculateTimeFromDelay } from '../utils/dates';
import { failedSearchToast } from '../utils/toaster';

const getSearchOptions = (state: RootState) => state.searchOptions;
const getSearchSize = (state: RootState) => state.search.size;

export function* fetchSearchResults(action: SearchRequest) {
  try {
    const options: SearchOptions = yield select(getSearchOptions);
    const searchSize = yield select(getSearchSize);

    const hitData: SearchResults = yield call(
      searchHits,
      options,
      searchSize === 0
    );

    /**
     * Provide feedback to the user if a singular search request returns 0 results.
     */
    if (hitData.isEmpty() && !action.continuous) {
      failedSearchToast();
    }

    yield put<SearchSuccess>(searchSuccess(hitData));
    yield put<FetchTOpticonRequest>(
      fetchTOpticonRequest(hitData.map(selectHitRequester).toArray())
    );

    if (action.continuous) {
      yield put<ScheduleNextSearch>(
        scheduleSearch(calculateTimeFromDelay(+options.delay))
      );
    }
  } catch (e) {
    failedSearchToast();
    yield put<SearchFailure>(searchFailure());
  }
}
