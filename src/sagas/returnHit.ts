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

// type ReturnHitResolution = ReturnHitFailure | ReturnHitSuccess;

export function* returnHit(action: ReturnHitRequest) {
  try {
    console.log(action.hitId);
    const status = yield call(sendReturnHitRequest, action.hitId);
    generateReturnToast(status);
    switch (status) {
      case 'error':
        put<ReturnHitFailure>(returnHitFailure());
        break;
      case 'repeat':
        put<ReturnHitFailure>(returnHitFailure());
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
