import {
  FETCH_QUEUE_REQUEST,
  FETCH_QUEUE_FAILURE,
  FETCH_QUEUE_SUCCESS
} from '../constants';
import { QueueMap } from '../types';

export interface FetchQueueRequest {
  readonly type: FETCH_QUEUE_REQUEST;
}

export interface FetchQueueSuccess {
  readonly type: FETCH_QUEUE_SUCCESS;
  readonly data: QueueMap;
}

export interface FetchQueueFailure {
  readonly type: FETCH_QUEUE_FAILURE;
}

export type QueueAction =
  | FetchQueueSuccess
  | FetchQueueFailure
  | FetchQueueRequest;

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
