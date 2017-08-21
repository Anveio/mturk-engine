import { Dispatch } from 'react-redux';
import { AcceptAction, acceptHitSuccess, acceptHitFailure } from '../actions/accept';
import { validateHitAcceptRequest } from '../utils/acceptHit';
import { generateAcceptHitToast } from '../utils/toastr';

export const sendAcceptRequest = (dispatch: Dispatch<AcceptAction>) => async (
  groupId: string
) => {
  try {
    const successful = await validateHitAcceptRequest(groupId);
    // const successful = true;
    generateAcceptHitToast(successful, groupId);
    successful ? dispatch(acceptHitSuccess()) : dispatch(acceptHitFailure());
    return successful;
  } catch (e) {
    dispatch(acceptHitFailure());
    return false;
  }
};
