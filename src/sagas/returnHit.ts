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
      return yield put<ReturnHitFailure>(returnHitFailure());
    }

    const successful: boolean = yield call(
      sendReturnHitRequest,
      action.queueItem,
      authToken
    );
    generateReturnToast(successful);

    return successful
      ? yield put<ReturnHitSuccess>(returnHitSuccess(hitId))
      : yield put<ReturnHitFailure>(returnHitFailure());
  } catch (e) {
    console.warn(e);
    generateReturnToast(false);
    yield put<ReturnHitFailure>(returnHitFailure());
  }
}
