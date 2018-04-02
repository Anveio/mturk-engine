import { call, put, select } from 'redux-saga/effects';
import { List } from 'immutable';
import { TOpticonResponse, RequesterId } from '../types';
import {
  FetchTOpticonRequest,
  FetchTOpticonSuccess,
  FetchTOpticonFailure,
  fetchTOpticonSuccess,
  fetchTOpticonFailure
} from '../actions/turkopticon';
// import { hitIdsWithNoTO } from '../selectors/searchTable';
import { topticonMapFromTO } from '../utils/turkopticon';
import { batchFetchTOpticon } from '../api/turkopticon';
import { attributeWeightsSelector } from '../selectors/turkopticon';
import { getSearchResultRequesterIds } from '../selectors/search';

export function* fetchTurkopticon(action: FetchTOpticonRequest) {
  try {
    const requesterIds: List<RequesterId> = yield select(
      getSearchResultRequesterIds
    );

    if (requesterIds.size > 0) {
      const rawTopticonData: TOpticonResponse = yield call(
        batchFetchTOpticon,
        requesterIds
      );

      const attributeWeights = yield select(attributeWeightsSelector);

      const topticonData = topticonMapFromTO(rawTopticonData, attributeWeights);

      yield put<FetchTOpticonSuccess>(fetchTOpticonSuccess(topticonData));
    }
  } catch (e) {
    yield put<FetchTOpticonFailure>(fetchTOpticonFailure());
  }
}
