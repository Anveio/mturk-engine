import { call, put } from 'redux-saga/effects';
import {
  ReturnHitRequest,
  ReturnHitFailure,
  returnHitFailure,
  ReturnHitSuccess,
  returnHitSuccess
} from '../actions/return';
import { sendReturnHitRequest } from '../api/returnHit';
import {
  generateReturnToast,
  createGenericWaitingToast,
  updateTopRightToaster
} from '../utils/toaster';
import { getHitAuthToken } from '../api/getHitAuthToken';

export function* returnHit(action: ReturnHitRequest) {
  const { title, hitId } = action.queueItem;
  const toasterKey = createGenericWaitingToast(`Returning "${title}" ...`);

  try {
    const authToken: string | null = yield call(
      getHitAuthToken,
      action.queueItem
    );

    if (!authToken) {
      updateTopRightToaster(toasterKey, generateReturnToast(false, title));
      return yield put<ReturnHitFailure>(returnHitFailure());
    }

    const successful: boolean = yield call(
      sendReturnHitRequest,
      action.queueItem,
      authToken
    );
    updateTopRightToaster(toasterKey, generateReturnToast(successful, title));

    return successful
      ? yield put<ReturnHitSuccess>(returnHitSuccess(hitId))
      : yield put<ReturnHitFailure>(returnHitFailure());
  } catch (e) {
    console.warn(e);
    updateTopRightToaster(toasterKey, generateReturnToast(false, title));
    yield put<ReturnHitFailure>(returnHitFailure());
  }
}
