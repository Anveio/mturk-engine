import { FETCH_QUEUE_FAILURE, FETCH_QUEUE_SUCCESS } from '../constants';
import { SearchMap } from '../types';

export interface FetchQueueSuccess {
  type: FETCH_QUEUE_SUCCESS;
  data: SearchMap;
}

export interface FetchQueueFailure {
  type: FETCH_QUEUE_FAILURE;
}

export type QueueAction = FetchQueueSuccess | FetchQueueFailure;

export const fetchQueueSuccess = (data: SearchMap): FetchQueueSuccess => ({
  type: FETCH_QUEUE_SUCCESS,
  data
});

export const fetchQueueFailure = (): FetchQueueFailure => ({
  type: FETCH_QUEUE_FAILURE
});
