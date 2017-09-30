import { put, all } from 'redux-saga/effects';
import { FetchStatusSummarySuccess } from '../actions/statusSummary';
import {
  FetchStatusDetailRequest,
  statusDetailRequest
} from '../actions/statusDetail';

export function* handleStatusSummarySuccess(action: FetchStatusSummarySuccess) {
  try {
    const { dateStrings } = action;
    yield all(
      dateStrings
        .map((dateString: string) =>
          put<FetchStatusDetailRequest>(statusDetailRequest(dateString))
        )
        .toArray()
    );
  } catch (e) {
    console.warn(e);
  }
}
