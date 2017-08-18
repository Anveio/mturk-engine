import { FETCH_QUEUE_FAILURE, FETCH_QUEUE_SUCCESS } from '../constants';
import { QueueMap } from '../types';

export interface FetchQueueSuccess {
  type: FETCH_QUEUE_SUCCESS;
  data: QueueMap;
}

export interface FetchQueueFailure {
  type: FETCH_QUEUE_FAILURE;
}

export type QueueAction = FetchQueueSuccess | FetchQueueFailure;

export const fetchQueueSuccess = (data: QueueMap): FetchQueueSuccess => ({
  type: FETCH_QUEUE_SUCCESS,
  data
});

export const fetchQueueFailure = (): FetchQueueFailure => ({
  type: FETCH_QUEUE_FAILURE
});
