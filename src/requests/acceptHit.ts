import { Dispatch } from 'react-redux';
import { SearchItem } from '../types';
import { Map } from 'immutable';
import { AcceptAction, acceptHitSuccess } from '../actions/accept';
import { validateHitAcceptRequest } from '../utils/acceptHit'

export const sendAcceptRequest = (dispatch: Dispatch<AcceptAction>) => async (
  groupId: string
) => {
  const fetchHits = (async () => {
    try {
      const successful = await validateHitAcceptRequest(groupId);
      successful
        ? dispatch(acceptHitSuccess())
        : dispatch(acceptHitFailure());
      return successful
    } catch (e) {
      /**
       * Return an empty set on error to simplify function signature.
       */
      dispatch(acceptHitFailure());
      return false;
    }
  })();
};
