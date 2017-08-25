import { call, put } from 'redux-saga/effects';
import {
  SearchRequest,
  SearchFailure,
  searchFailure,
  searchSuccess,
  SearchSuccess
} from '../actions/search';
import { batchFetchHits } from '../utils/fetchHits';

export function* fetchSearch(action: SearchRequest) {
  try {
    const hitData = yield call(batchFetchHits, action.options);
    yield put<SearchSuccess>(searchSuccess(hitData));
  } catch (e) {
    yield put<SearchFailure>(searchFailure());
  }
}
