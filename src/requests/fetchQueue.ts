import { Dispatch } from 'react-redux';
import { SearchItem } from '../types';
import { Map } from 'immutable';
import { fetchQueueSuccess, fetchQueueFailure, QueueAction } from '../actions/queue';
import { getQueuePage } from '../utils/fetchQueue';
import { generateQueueToast } from '../utils/toastr';

export const fetchQueue = (dispatch: Dispatch<QueueAction>) => async () => {
  try {
    const queueData = await getQueuePage();
    const successful = !queueData.isEmpty();
    generateQueueToast(successful);
    successful
      ? dispatch(fetchQueueSuccess(queueData))
      : dispatch(fetchQueueFailure());
    return queueData;
  } catch (e) {
    dispatch(fetchQueueFailure());
    generateQueueToast(false);
    return Map<string, SearchItem>();
  }
};
