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
import { searchHits } from '../api/search';
import { calculateDateAfterDelay } from '../utils/dates';
import { failedSearchToast } from '../utils/toaster';
import { MarkAllHitsAsRead, markAllHitsAsRead } from 'actions/markAsRead';
import { selectGroupId } from 'selectors/search';

const getSearchOptions = (state: RootState) => state.searchOptions;
const getSearchSize = (state: RootState) => state.search.size;

export function* fetchSearchResults(action: SearchRequest) {
  try {
    const options: SearchOptions = yield select(getSearchOptions);
    const initialSearchResultsSize = yield select(getSearchSize);

    const hitData: SearchResults = yield call(searchHits, options);

    /**
     * Provide feedback to the user if a singular search request returns 0 results.
     */
    if (hitData.isEmpty() && !action.continuous) {
      failedSearchToast();
    }

    /**
     * If the user had no search results initially, mark everything as read
     * before displaying the results.
     */
    if (initialSearchResultsSize === 0) {
      yield put<MarkAllHitsAsRead>(
        markAllHitsAsRead(hitData.map(selectGroupId).toSet())
      );
    }

    yield put<SearchSuccess>(searchSuccess(hitData));

    if (action.continuous) {
      yield put<ScheduleNextSearch>(
        scheduleSearch(calculateDateAfterDelay(Date.now(), +options.delay))
      );
    }
  } catch (e) {
    failedSearchToast();
    yield put<SearchFailure>(searchFailure());
  }
}
