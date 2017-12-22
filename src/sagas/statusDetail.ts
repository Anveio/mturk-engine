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
import { dateObjectTo } from '../utils/dates';
import { WORKER_DATE_FORMAT } from '../constants/misc';

export function* handleStatusDetailRequest(action: FetchStatusDetailRequest) {
  try {
    const { date, page } = action;
    const encodedDateString = dateObjectTo(date)(WORKER_DATE_FORMAT);
    const pageInfo: StatusDetailPageInfo = yield call(
      fetchStatusDetailPage,
      encodedDateString,
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
      yield put<FetchStatusDetailRequest>(statusDetailRequest(date, page + 1));
    }
  } catch (e) {
    statusDetailErrorToast(action.date.toLocaleDateString());
    console.warn(e);
    yield put<FetchStatusDetailFailure>(statusDetailFailure());
  }
}

const conditionallyDisplayToast = (
  action: FetchStatusDetailRequest,
  noDataFound: boolean
) => {
  if (action.withToast) {
    statusDetailToast(action.date.toLocaleDateString(), noDataFound);
  }
};
