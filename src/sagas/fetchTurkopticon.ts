import { call, put } from 'redux-saga/effects';
import { RequesterMap } from '../types';
import {
  FetchTOpticonRequest,
  FetchTOpticonSuccess,
  FetchTOpticonFailure,
  fetchTOpticonSuccess,
  fetchTOpticonFailure
} from '../actions/turkopticon';
import { selectRequesterId } from '../utils/turkopticon';
import { batchFetchTOpticon } from '../api/turkopticon';

export function* fetchTurkopticon(action: FetchTOpticonRequest) {
  try {
    const requesterIds = action.data.map(selectRequesterId).toArray();
    const topticonData: RequesterMap = yield call(
      batchFetchTOpticon,
      requesterIds
    );
    yield put<FetchTOpticonSuccess>(fetchTOpticonSuccess(topticonData));
  } catch (e) {
    yield put<FetchTOpticonFailure>(fetchTOpticonFailure());
  }
}
