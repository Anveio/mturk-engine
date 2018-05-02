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
import {
  statusDetailToast,
  statusDetailErrorToast,
  showWaitingToast
} from '../utils/toaster';
import { dateObjectTo } from '../utils/dates';
import { WORKER_DATE_FORMAT } from 'constants/dates';

export function* handleStatusDetailRequest(action: FetchStatusDetailRequest) {
  const { date, page } = action;
  const toasterKey = conditionallyDisplayWaitingToast(action);
  const encodedDateString = dateObjectTo(date)(WORKER_DATE_FORMAT);

  try {
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

    conditionallyDisplaySuccessToast(action, data.isEmpty(), toasterKey);

    /**
     * Recursively call this function with page+1.
     */
    if (morePages) {
      yield put<FetchStatusDetailRequest>(statusDetailRequest(date, page + 1));
    }
  } catch (e) {
    statusDetailErrorToast(action.date.toLocaleDateString(), toasterKey);
    console.warn(e);
    yield put<FetchStatusDetailFailure>(statusDetailFailure());
  }
}

const conditionallyDisplaySuccessToast = (
  action: FetchStatusDetailRequest,
  noDataFound: boolean,
  key?: string
) => {
  if (action.withToast && key) {
    statusDetailToast(action.date.toLocaleDateString(), noDataFound, key);
  }
};

const conditionallyDisplayWaitingToast = (
  action: FetchStatusDetailRequest
): string | undefined => {
  if (!action.withToast) {
    return undefined;
  }

  return showWaitingToast(
    `Refreshing HITs for ${action.date.toLocaleDateString()}`
  );
};
