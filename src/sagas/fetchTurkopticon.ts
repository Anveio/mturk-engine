import { call, put } from 'redux-saga/effects';
import { TOpticonMap } from '../types';
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
    const requesterIds = action.data.map(selectRequesterId)
    const topticonData: TOpticonMap = yield call(
      batchFetchTOpticon,
      requesterIds
    );
    yield put<FetchTOpticonSuccess>(fetchTOpticonSuccess(topticonData));
  } catch (e) {
    yield put<FetchTOpticonFailure>(fetchTOpticonFailure());
  }
}
