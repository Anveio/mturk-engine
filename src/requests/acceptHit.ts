import { Dispatch } from 'react-redux';
import { AcceptAction, acceptHitSuccess, acceptHitFailure } from '../actions/accept';
import { validateHitAcceptRequest } from '../utils/acceptHit';

export const sendAcceptRequest = (dispatch: Dispatch<AcceptAction>) => async (
  groupId: string
) => {
  try {
    const successful = await validateHitAcceptRequest(groupId);
    successful ? dispatch(acceptHitSuccess()) : dispatch(acceptHitFailure());
    return successful;
  } catch (e) {
    dispatch(acceptHitFailure());
    return false;
  }
};
