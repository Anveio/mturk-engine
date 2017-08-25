import {
  ACCEPT_HIT_SUCCESS,
  ACCEPT_HIT_FAILURE,
  ACCEPT_HIT_REQUEST
} from '../constants';
import { SearchItem, QueueItem } from '../types';

export interface AcceptHitSuccess {
  type: ACCEPT_HIT_SUCCESS;
  data: QueueItem;
}
export interface AcceptHitFailure {
  type: ACCEPT_HIT_FAILURE;
}

export interface AcceptHitRequest {
  type: ACCEPT_HIT_REQUEST;
  data: SearchItem;
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

export const acceptHitRequest = (data: SearchItem): AcceptHitRequest => ({
  type: ACCEPT_HIT_REQUEST,
  data
});
