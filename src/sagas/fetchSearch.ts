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
import { batchFetchTOpticon, selectRequesterId } from '../utils/turkopticon';
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
      const requesterIds = hitData.map(selectRequesterId).toArray();
      const topticonData = yield call(batchFetchTOpticon, requesterIds);
      yield put<FetchTOpticonSuccess>(fetchTOpticonSuccess(topticonData));
    }
  } catch (e) {
    yield put<SearchFailure>(searchFailure());
    yield put<FetchTOpticonFailure>(fetchTOpticonFailure());
  }
}
