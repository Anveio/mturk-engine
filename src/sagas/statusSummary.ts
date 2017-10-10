import { call, put } from 'redux-saga/effects';
import {
  FetchStatusSummaryRequest,
  FetchStatusSummaryFailure,
  FetchStatusSummarySuccess,
  statusSummarySuccess,
  statusSummaryFailure
} from '../actions/statusSummary';
import {
  RefreshDatabaseRequest,
  databaseRefreshRequest
} from '../actions/refreshDatabase';
import { fetchStatusSummaryPage } from '../api/statusSummary';
import { emptySummaryPageToast } from '../utils/toaster';

export function* handleStatusSummaryRequest(action: FetchStatusSummaryRequest) {
  try {
    const dateStrings: string[] = yield call(fetchStatusSummaryPage);

    if (dateStrings.length === 0) {
      emptySummaryPageToast();
      yield put<FetchStatusSummaryFailure>(statusSummaryFailure());
    } else {
      yield put<FetchStatusSummarySuccess>(statusSummarySuccess());
    }

    yield put<RefreshDatabaseRequest>(databaseRefreshRequest(dateStrings));
  } catch (e) {
    emptySummaryPageToast();
    yield put<FetchStatusSummaryFailure>(statusSummaryFailure());
  }
}
