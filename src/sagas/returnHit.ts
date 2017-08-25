import { call, put } from 'redux-saga/effects';
import {
  ReturnHitRequest,
  ReturnHitFailure,
  returnHitFailure,
  ReturnHitSuccess,
  returnHitSuccess
} from '../actions/return';
import { sendReturnHitRequest } from '../utils/returnHit';
import { generateReturnToast } from '../utils/toastr';

export function* returnHit(action: ReturnHitRequest) {
  try {
    const status = yield call(sendReturnHitRequest, action.hitId);
    generateReturnToast(status);
    switch (status) {
      case 'error':
        yield put<ReturnHitFailure>(returnHitFailure());
        break;
      case 'repeat':
        yield put<ReturnHitFailure>(returnHitFailure());
        break;
      case 'success':
        yield put<ReturnHitSuccess>(returnHitSuccess(action.hitId));
        break;
      default:
        yield put<ReturnHitFailure>(returnHitFailure());
    }
  } catch (e) {
    generateReturnToast('error');
    yield put<ReturnHitFailure>(returnHitFailure());
  }
}
