import { call, put } from 'redux-saga/effects';
import {
  FetchStatusSummaryRequest,
  FetchStatusSummaryFailure,
  FetchStatusSummarySuccess,
  statusSummarySuccess,
  statusSummaryFailure
} from '../actions/statusSummary';
import { List } from 'immutable';
import { fetchStatusSummaryPage } from '../api/statusSummary';
import { emptySummaryPageToast } from '../utils/toastr';

export function* handleStatusSummaryRequest(action: FetchStatusSummaryRequest) {
  try {
    const dateStrings: List<string> = yield call(fetchStatusSummaryPage);

    if (dateStrings.isEmpty()) {
      yield put<FetchStatusSummaryFailure>(statusSummaryFailure());
      emptySummaryPageToast();
    } else {
      yield put<FetchStatusSummarySuccess>(statusSummarySuccess(dateStrings));
    }
  } catch (e) {
    console.warn(e);
    yield put<FetchStatusSummaryFailure>(statusSummaryFailure());
  }
}
