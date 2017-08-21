import { Dispatch } from 'react-redux';
import { QueueAction } from '../actions/queue';
import { sendReturnHitRequest } from '../utils/returnHit';
import { generateReturnToast, errorReturnToast } from '../utils/toastr';

export const returnHit = (dispatch: Dispatch<QueueAction>) => async (
  hitId: string
) => {
  try {
    const status = await sendReturnHitRequest(hitId);
    console.log(status);
    generateReturnToast(status);
    return status;
  } catch (e) {
    errorReturnToast();
    return 'error';
  }
};
