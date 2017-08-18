import { Dispatch } from 'react-redux';
import { SearchItem } from '../types';
import { Map } from 'immutable';
import { fetchQueueSuccess, fetchQueueFailure, QueueAction } from '../actions/queue';
import { getQueuePage } from '../utils/fetchQueue';

export const fetchQueue = (dispatch: Dispatch<QueueAction>) => async () => {
  try {
    const queueData = await getQueuePage();
    queueData.isEmpty()
      ? dispatch(fetchQueueFailure())
      : dispatch(fetchQueueSuccess(queueData));
    return queueData;
  } catch (e) {
    dispatch(fetchQueueFailure());
    return Map<string, SearchItem>();
  }
};
