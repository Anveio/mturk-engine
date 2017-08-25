import {
  FETCH_QUEUE_REQUEST,
  FETCH_QUEUE_FAILURE,
  FETCH_QUEUE_SUCCESS
} from '../constants';
import { QueueMap } from '../types';

export interface FetchQueueRequest {
  type: FETCH_QUEUE_REQUEST;
}

export interface FetchQueueSuccess {
  type: FETCH_QUEUE_SUCCESS;
  data: QueueMap;
}

export interface FetchQueueFailure {
  type: FETCH_QUEUE_FAILURE;
}

export type QueueAction = FetchQueueSuccess | FetchQueueFailure;

export const fetchQueueRequest = (): FetchQueueRequest => ({
  type: FETCH_QUEUE_REQUEST
});

export const fetchQueueSuccess = (data: QueueMap): FetchQueueSuccess => ({
  type: FETCH_QUEUE_SUCCESS,
  data
});

export const fetchQueueFailure = (): FetchQueueFailure => ({
  type: FETCH_QUEUE_FAILURE
});
