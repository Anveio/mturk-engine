import { call, put } from 'redux-saga/effects';
import {
  FetchStatusSummaryRequest,
  FetchStatusSummaryFailure,
  FetchStatusSummarySuccess,
  statusSummarySuccess,
  statusSummaryFailure
} from '../actions/statusSummary';
import { fetchStatusSummaryPage } from '../api/statusSummary';

export function* handleStatusDetailRequest(action: FetchStatusSummaryRequest) {
  try {
    const dateStrings = yield call(fetchStatusSummaryPage);
    yield put<FetchStatusSummarySuccess>(statusSummarySuccess(dateStrings));
  } catch (e) {
    console.warn(e);
    yield put<FetchStatusSummaryFailure>(statusSummaryFailure());
  }
}
