import {
  ACCEPT_HIT_SUCCESS,
  ACCEPT_HIT_FAILURE,
  ACCEPT_HIT_REQUEST
} from '../constants';
import { SearchResult, QueueItem } from '../types';

export interface AcceptHitSuccess {
  type: ACCEPT_HIT_SUCCESS;
  data: QueueItem;
}
export interface AcceptHitFailure {
  type: ACCEPT_HIT_FAILURE;
}

export interface AcceptHitRequest {
  type: ACCEPT_HIT_REQUEST;
  data: SearchResult;
}

export type AcceptAction =
  | AcceptHitSuccess
  | AcceptHitFailure
  | AcceptHitRequest;

export const acceptHitSuccess = (data: QueueItem): AcceptHitSuccess => ({
  type: ACCEPT_HIT_SUCCESS,
  data
});

export const acceptHitFailure = (): AcceptHitFailure => ({
  type: ACCEPT_HIT_FAILURE
});

export const acceptHitRequest = (data: SearchResult): AcceptHitRequest => ({
  type: ACCEPT_HIT_REQUEST,
  data
});
