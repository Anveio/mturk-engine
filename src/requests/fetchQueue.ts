import { Dispatch } from 'react-redux';
import { Hit } from '../types';
import { Map } from 'immutable';
import { fetchQueueSuccess, fetchQueueFailure, QueueAction } from '../actions/queue';

export const fetchQueue = (dispatch: Dispatch<QueueAction>) => async () => {
  try {
    const queueData = await Promise.resolve(Map<string, Hit>());
    queueData.isEmpty()
      ? dispatch(fetchQueueFailure())
      : dispatch(fetchQueueSuccess(queueData));
    return queueData;
  } catch (e) {
    dispatch(fetchQueueFailure());
    return Map<string, Hit>();
  }
};
