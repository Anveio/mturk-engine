import { call, put } from 'redux-saga/effects';
import {
  ReturnHitRequest,
  ReturnHitFailure,
  returnHitFailure,
  ReturnHitSuccess,
  returnHitSuccess
} from '../actions/return';
import { sendReturnHitRequest } from '../api/returnHit';
import { generateReturnToast } from '../utils/toaster';
import { getHitAuthToken } from '../api/getHitAuthToken';

export function* returnHit(action: ReturnHitRequest) {
  try {
    const { hitId } = action.queueItem;

    const authToken: string | null = yield call(
      getHitAuthToken,
      action.queueItem
    );

    if (!authToken) {
      console.warn('No auth token found for this HIT.');
      return yield put<ReturnHitFailure>(returnHitFailure());
    }

    const status = yield call(
      sendReturnHitRequest,
      action.queueItem,
      authToken
    );
    generateReturnToast(status);
    switch (status) {
      case 'error':
        yield put<ReturnHitFailure>(returnHitFailure());
        break;
      case 'repeat':
        yield put<ReturnHitSuccess>(returnHitSuccess(hitId));
        break;
      case 'success':
        yield put<ReturnHitSuccess>(returnHitSuccess(hitId));
        break;
      default:
        yield put<ReturnHitFailure>(returnHitFailure());
    }
  } catch (e) {
    console.warn(e);
    generateReturnToast('error');
    yield put<ReturnHitFailure>(returnHitFailure());
  }
}
