import { Dispatch } from 'react-redux';
import { SearchItem } from '../types';
import { AcceptAction, acceptHitSuccess, acceptHitFailure } from '../actions/accept';
import { validateHitAcceptRequest } from '../utils/acceptHit';
import { Map } from 'immutable';
import { fetchQueueSuccess, fetchQueueFailure } from '../actions/queue';
import { getQueuePage } from '../utils/fetchQueue';
import { generateAcceptHitToast } from '../utils/toastr';

export const sendAcceptRequest = (dispatch: Dispatch<AcceptAction>) => async (
  hit: SearchItem
) => {
  const attemptToAccept = (async () => {
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
  })();

  (async () => {
    try {
      const shouldUpdate = await attemptToAccept;
      if (shouldUpdate) {
        const queueData = await getQueuePage();
        const successful = !queueData.isEmpty();
        successful
          ? dispatch(fetchQueueSuccess(queueData))
          : dispatch(fetchQueueFailure());
        return queueData;
      } else {
        return;
      }
    } catch (e) {
      dispatch(fetchQueueFailure());
      return Map<string, SearchItem>();
    }
  })();
};
