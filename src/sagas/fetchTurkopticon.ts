import { call, put } from 'redux-saga/effects';
import {
  FetchTOpticonRequest,
  FetchTOpticonSuccess,
  FetchTOpticonFailure,
  fetchTOpticonSuccess,
  fetchTOpticonFailure
} from '../actions/turkopticon';
import { batchFetchTOpticon, selectRequesterId } from '../utils/turkopticon';

export function* fetchTurkopticon(action: FetchTOpticonRequest) {
  try {
    const requesterIds = action.data.map(selectRequesterId).toArray();
    const topticonData = yield call(batchFetchTOpticon, requesterIds);
    yield put<FetchTOpticonSuccess>(fetchTOpticonSuccess(topticonData));
  } catch (e) {
    yield put<FetchTOpticonFailure>(fetchTOpticonFailure());
  }
}
