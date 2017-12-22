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
import { fetchSubmittedHitHistory } from '../api/dashboard';
import { emptySummaryPageToast } from '../utils/toaster';

export function* handleStatusSummaryRequest(action: FetchStatusSummaryRequest) {
  try {
    const workedDates: Date[] = yield call(fetchSubmittedHitHistory);

    if (workedDates.length === 0) {
      emptySummaryPageToast();
      yield put<FetchStatusSummaryFailure>(statusSummaryFailure());
    } else {
      yield put<FetchStatusSummarySuccess>(statusSummarySuccess());
    }

    yield put<RefreshDatabaseRequest>(databaseRefreshRequest(workedDates));
  } catch (e) {
    emptySummaryPageToast();
    yield put<FetchStatusSummaryFailure>(statusSummaryFailure());
  }
}
