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
import { statusDetailToast, statusDetailErrorToast } from '../utils/toaster';
import { legacyDateStringToWorkerDateString } from '../utils/dates';

export function* handleStatusDetailRequest(action: FetchStatusDetailRequest) {
  try {
    const { dateFormat, dateString, page } = action;

    const formattedDateString =
      dateFormat === 'MMDDYYYY'
        ? legacyDateStringToWorkerDateString(dateString)
        : dateString;

    const pageInfo: StatusDetailPageInfo = yield call(
      fetchStatusDetailPage,
      formattedDateString,
      page
    );
    const { data, morePages } = pageInfo;

    if (data.isEmpty()) {
      yield put<FetchStatusDetailFailure>(statusDetailFailure());
    } else {
      yield put<FetchStatusDetailSuccess>(statusDetailSuccess(data));
    }

    conditionallyDisplayToast(action, data.isEmpty());

    /**
     * Recursively call this function with page+1.
     */
    if (morePages) {
      yield put<FetchStatusDetailRequest>(
        statusDetailRequest(formattedDateString, 'YYYY-MM-DD', page + 1)
      );
    }
  } catch (e) {
    statusDetailErrorToast(action.dateString);
    console.warn(e);
    yield put<FetchStatusDetailFailure>(statusDetailFailure());
  }
}

const conditionallyDisplayToast = (
  action: FetchStatusDetailRequest,
  noDataFound: boolean
) => {
  if (action.withToast) {
    statusDetailToast(action.dateString, noDataFound);
  }
};
