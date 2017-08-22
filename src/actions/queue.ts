import {
  FETCH_QUEUE_FAILURE,
  FETCH_QUEUE_SUCCESS,
  RETURN_HIT_FAILURE,
  RETURN_HIT_SUCCESS
} from '../constants';
import { QueueMap } from '../types';

export interface FetchQueueSuccess {
  type: FETCH_QUEUE_SUCCESS;
  data: QueueMap;
}

export interface FetchQueueFailure {
  type: FETCH_QUEUE_FAILURE;
}

export interface ReturnHitFailure {
  type: RETURN_HIT_FAILURE;
}

export interface ReturnHitSuccess {
  type: RETURN_HIT_SUCCESS;
  hitId: string;
}

export type QueueAction = FetchQueueSuccess | FetchQueueFailure;
export type ReturnAction = ReturnHitFailure | ReturnHitSuccess;

export const fetchQueueSuccess = (data: QueueMap): FetchQueueSuccess => ({
  type: FETCH_QUEUE_SUCCESS,
  data
});

export const fetchQueueFailure = (): FetchQueueFailure => ({
  type: FETCH_QUEUE_FAILURE
});

export const returnHitFailure = (): ReturnHitFailure => ({
  type: RETURN_HIT_FAILURE
});

export const returnHitSuccess = (hitId: string): ReturnHitSuccess => ({
  type: RETURN_HIT_SUCCESS,
  hitId
});
