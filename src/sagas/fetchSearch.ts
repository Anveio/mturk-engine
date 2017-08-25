import { call, put } from 'redux-saga/effects';
import { SearchItem } from '../types';
import { Map } from 'immutable';
import {
  SearchRequest,
  SearchFailure,
  searchFailure,
  searchSuccess,
  SearchSuccess
} from '../actions/search';
import {
  FetchTOpticonSuccess,
  FetchTOpticonFailure,
  fetchTOpticonSuccess,
  fetchTOpticonFailure
} from '../actions/turkopticon';
import { batchFetchHits } from '../utils/fetchHits';
import { batchFetchTOpticon, requesterIdsWithNoTO } from '../utils/turkopticon';
import { generateSearchToast } from '../utils/toastr';

export function* fetchSearch(action: SearchRequest) {
  try {
    const hitData: Map<string, SearchItem> = yield call(
      batchFetchHits,
      action.options
    );

    const empty = hitData.isEmpty();
    generateSearchToast(!empty);
    empty
      ? yield put<SearchFailure>(searchFailure())
      : yield put<SearchSuccess>(searchSuccess(hitData));

    if (!empty) {
      const requesterIds = requesterIdsWithNoTO(hitData);
      const topticonData = yield call(batchFetchTOpticon, requesterIds);
      yield put<FetchTOpticonSuccess>(fetchTOpticonSuccess(topticonData));
    }
  } catch (e) {
    generateSearchToast(false);
    yield put<SearchFailure>(searchFailure());
    yield put<FetchTOpticonFailure>(fetchTOpticonFailure());
  }
}
