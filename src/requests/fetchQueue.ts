import { Dispatch } from 'react-redux';
import { SearchItem } from '../types';
import { Map } from 'immutable';
import { fetchQueueSuccess, fetchQueueFailure, QueueAction } from '../actions/queue';
import { getQueuePage } from '../utils/fetchQueue';
import { generateQueueToast, failedQueueToast } from '../utils/toastr';

export const fetchQueue = (dispatch: Dispatch<QueueAction>) => async () => {
  try {
    const queueData = await getQueuePage();
    const empty = !queueData.isEmpty();
    generateQueueToast(empty);
    dispatch(fetchQueueSuccess(queueData));
    return queueData;
  } catch (e) {
    dispatch(fetchQueueFailure());
    failedQueueToast();
    return Map<string, SearchItem>();
  }
};
