import { call, put, select } from 'redux-saga/effects';
import { TOpticonResponse, RequesterMap, SearchResult } from '../types';
import {
  FetchTOpticonRequest,
  FetchTOpticonSuccess,
  FetchTOpticonFailure,
  fetchTOpticonSuccess,
  fetchTOpticonFailure,
  fetchTOpticonRequest
} from '../actions/turkopticon';
import { topticonMapFromTO, selectHitRequesterId } from '../utils/turkopticon';
import { batchFetchTOpticon } from '../api/turkopticon';
import { attributeWeightsSelector } from '../selectors/turkopticon';
import { SearchSuccess } from 'actions/search';
import { loggedRequestersSelector } from 'selectors';

/**
 * Pare the search results down to the requesters that we don't currently have data for.
 * @param action
 */
export function* requestDataForUnseenRequesters(action: SearchSuccess) {
  const loggedRequesters: RequesterMap = yield select(loggedRequestersSelector);

  const searchResultsWithNoTOData = action.data.filterNot((hit: SearchResult) =>
    loggedRequesters.has(hit.requester.id)
  );

  yield put<FetchTOpticonRequest>(
    fetchTOpticonRequest(
      searchResultsWithNoTOData.map(selectHitRequesterId).toList()
    )
  );
}

export function* fetchTurkopticon({ data }: FetchTOpticonRequest) {
  try {
    if (data.size > 0) {
      const rawTopticonData: TOpticonResponse = yield call(
        batchFetchTOpticon,
        data
      );

      const attributeWeights = yield select(attributeWeightsSelector);

      const topticonData = topticonMapFromTO(rawTopticonData, attributeWeights);

      yield put<FetchTOpticonSuccess>(fetchTOpticonSuccess(topticonData));
    }
  } catch (e) {
    yield put<FetchTOpticonFailure>(fetchTOpticonFailure());
  }
}
