import { put, all, select } from 'redux-saga/effects';
import { HitDatabaseMap } from '../types';
import { FetchStatusSummarySuccess } from '../actions/statusSummary';
import {
  RefreshDatabaseFailure,
  RefreshDatabaseSuccess,
  databaseRefreshFailure,
  databaseRefreshSuccess
} from '../actions/refreshDatabase';
import {
  // FetchStatusDetailRequest,
  statusDetailRequest
} from '../actions/statusDetail';
import { refreshDbSuccessToast, refreshDbErrorToast } from '../utils/toaster';
import { hitDatabaseSelector } from '../selectors/hitDatabase';
import { handleStatusDetailRequest } from './statusDetail';

export function* handleStatusSummarySuccess(action: FetchStatusSummarySuccess) {
  try {
    const { dateStrings } = action;

    const initialDb: HitDatabaseMap = yield select(hitDatabaseSelector);

    yield all(
      dateStrings.map(function*(dateString: string) {
        /**
         * We call the `handleStatusDetailRequest` saga directly instead of 
         * dispatching the action to the store because we need to wait for the 
         * SUCCESSes to be returned. Otherwise, dispatching a request will cause 
         * this saga to continue without waiting for the results of all the 
         * requests.
         */
        yield handleStatusDetailRequest(statusDetailRequest(dateString));
      })
    );

    const finalDb: HitDatabaseMap = yield select(hitDatabaseSelector);

    refreshDbSuccessToast(dateStrings.length, finalDb.size - initialDb.size);
    yield put<RefreshDatabaseSuccess>(databaseRefreshSuccess());
  } catch (e) {
    refreshDbErrorToast();
    yield put<RefreshDatabaseFailure>(databaseRefreshFailure([]));
  }
}
