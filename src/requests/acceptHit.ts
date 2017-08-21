import { Dispatch } from 'react-redux';
import { SearchItem } from '../types';
import { AcceptAction, acceptHitSuccess, acceptHitFailure } from '../actions/accept';
import { validateHitAcceptRequest } from '../utils/acceptHit';
import { generateAcceptHitToast } from '../utils/toastr';

export const sendAcceptRequest = (dispatch: Dispatch<AcceptAction>) => async (
  hit: SearchItem
) => {
  try {
    const successful = await validateHitAcceptRequest(hit.groupId);
    // const successful = true;
    generateAcceptHitToast(successful, hit.title);
    successful ? dispatch(acceptHitSuccess()) : dispatch(acceptHitFailure());
    return successful;
  } catch (e) {
    generateAcceptHitToast(false, hit.title);
    dispatch(acceptHitFailure());
    return false;
  }
};
