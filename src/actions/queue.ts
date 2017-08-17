import { FETCH_QUEUE_FAILURE, FETCH_QUEUE_SUCCESS } from '../constants';
import { HitMap } from '../types';

export interface FetchQueueSuccess {
  type: FETCH_QUEUE_SUCCESS;
  data: HitMap;
}

export interface FetchQueueFailure {
  type: FETCH_QUEUE_FAILURE;
}

export type QueueAction = FetchQueueSuccess;

export const fetchQueueSuccess = (data: HitMap): FetchQueueSuccess => ({
  type: FETCH_QUEUE_SUCCESS,
  data
});

export const fetchQueueFailure = (): FetchQueueFailure => ({
  type: FETCH_QUEUE_FAILURE
});
