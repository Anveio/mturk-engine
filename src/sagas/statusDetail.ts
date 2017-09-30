import { call, put } from 'redux-saga/effects';
import {
  FetchStatusDetailFailure,
  FetchStatusDetailRequest,
  FetchStatusDetailSuccess,
  statusDetailRequest,
  statusDetailFailure,
  statusDetailSuccess
} from '../actions/statusDetail';
import {
  fetchStatusDetailPage,
  StatusDetailPageInfo
} from '../api/statusDetail';

export function* handleStatusDetailRequest(action: FetchStatusDetailRequest) {
  try {
    /**
     * HARD CODED DATA: REPLACE THIS.
     */
    const encodedDateString = '09222017';

    const pageInfo: StatusDetailPageInfo = yield call(
      fetchStatusDetailPage,
      encodedDateString
    );
    const { data, morePages } = pageInfo;

    if (data.isEmpty()) {
      yield put<FetchStatusDetailFailure>(statusDetailFailure());
    } else {
      yield put<FetchStatusDetailSuccess>(statusDetailSuccess(data));
    }

    /**
     * Recursively call this function with page+1.
     */
    if (morePages) {
      yield put<FetchStatusDetailRequest>(
        statusDetailRequest(action.date, action.page + 1)
      );
    }
  } catch (e) {
    console.warn(e);
    yield put<FetchStatusDetailFailure>(statusDetailFailure());
  }
}
