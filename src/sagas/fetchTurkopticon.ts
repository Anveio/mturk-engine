import { call, put, select } from 'redux-saga/effects';
import { RootState, SearchResult, TOpticonResponse } from '../types';
import {
  FetchTOpticonRequest,
  FetchTOpticonSuccess,
  FetchTOpticonFailure,
  fetchTOpticonSuccess,
  fetchTOpticonFailure
} from '../actions/turkopticon';
// import { hitIdsWithNoTO } from '../selectors/searchTable';
import { noTurkopticon, topticonMapFromTO } from '../utils/turkopticon';
import { batchFetchTOpticon } from '../api/turkopticon';
import { attributeWeightsSelector } from '../selectors/turkopticon';

export function* fetchTurkopticon(action: FetchTOpticonRequest) {
  try {
    const requesterIds = yield select((state: RootState) =>
      state.search
        .filter(noTurkopticon)
        .map((hit: SearchResult) => hit.requester.id)
        .toArray()
    );

    if (requesterIds.length > 0) {
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
