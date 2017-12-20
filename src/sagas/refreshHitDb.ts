import { put, all, select } from 'redux-saga/effects';
import { HitDatabaseMap } from '../types';
import {
  RefreshDatabaseRequest,
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

export function* handleStatusSummarySuccess(action: RefreshDatabaseRequest) {
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
        yield handleStatusDetailRequest(
          /**
           * The format is YYYY-MM-DD automatically because they were retrieved
           * from manually parsing the worker site.
           */
          statusDetailRequest(dateString, 'YYYY-MM-DD')
        );
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
