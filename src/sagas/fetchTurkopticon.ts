import { call, put, select } from 'redux-saga/effects';
import { RootState, SearchResult, RequesterMap } from '../types';
import {
  FetchTOpticonRequest,
  FetchTOpticonSuccess,
  FetchTOpticonFailure,
  fetchTOpticonSuccess,
  fetchTOpticonFailure
} from '../actions/turkopticon';
// import { hitIdsWithNoTO } from '../selectors/searchTable';
import { noTurkopticon } from '../utils/turkopticon';
import { batchFetchTOpticon } from '../api/turkopticon';

export function* fetchTurkopticon(action: FetchTOpticonRequest) {
  try {
    const requesterIds = yield select((state: RootState) =>
      state.search
        .filter(noTurkopticon)
        .map((hit: SearchResult) => hit.requester.id)
        .toArray()
    );

    if (requesterIds.length > 0) {
      const topticonData: RequesterMap = yield call(
        batchFetchTOpticon,
        requesterIds
      );
      yield put<FetchTOpticonSuccess>(fetchTOpticonSuccess(topticonData));
    }
  } catch (e) {
    yield put<FetchTOpticonFailure>(fetchTOpticonFailure());
  }
}
