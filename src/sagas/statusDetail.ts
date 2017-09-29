import { call, put } from 'redux-saga/effects';
import {
  FetchStatusDetailFailure,
  FetchStatusDetailRequest,
  FetchStatusDetailSuccess,
  statusDetailFailure,
  statusDetailSuccess
} from '../actions/statusDetail';
import { fetchStatusDetailPage } from '../api/statusDetail';

export function* handleStatusDetailRequest(action: FetchStatusDetailRequest) {
  try {
    /**
     * HARD CODED DATA: REPLACE THIS.
     */
    const encodedDateString = '09222017';

    const hitDBMap = yield call(fetchStatusDetailPage, encodedDateString);
    yield put<FetchStatusDetailSuccess>(statusDetailSuccess(hitDBMap));
  } catch (e) {
    yield put<FetchStatusDetailFailure>(statusDetailFailure());
  }
}
