import { Dispatch } from 'react-redux';
import {
  ReturnAction,
  returnHitFailure,
  returnHitSuccess
} from '../actions/return';
import { sendReturnHitRequest } from '../utils/returnHit';
import { generateReturnToast, errorReturnToast } from '../utils/toastr';

export const returnHit = (dispatch: Dispatch<ReturnAction>) => async (
  hitId: string
) => {
  try {
    const status = await sendReturnHitRequest(hitId);
    generateReturnToast(status);
    switch (status) {
      case 'error':
        dispatch(returnHitFailure());
        break;
      case 'repeat':
        dispatch(returnHitSuccess(hitId));
        break;
      case 'success':
        dispatch(returnHitSuccess(hitId));
        break;
      default:
        dispatch(returnHitFailure());
    }
    return status;
  } catch (e) {
    errorReturnToast();
    return 'error';
  }
};
