import {
  ACCEPT_HIT_SUCCESS,
  ACCEPT_HIT_FAILURE,
  ACCEPT_HIT_REQUEST
} from '../constants';
import { SearchResult, QueueItem } from '../types';

export interface AcceptHitSuccess {
  readonly type: ACCEPT_HIT_SUCCESS;
  readonly data: QueueItem;
}
export interface AcceptHitFailure {
  readonly type: ACCEPT_HIT_FAILURE;
}

export interface AcceptHitRequest {
  readonly type: ACCEPT_HIT_REQUEST;
  readonly groupId: string;
  readonly fromWatcher: boolean;
  readonly data?: SearchResult;
  readonly delay?: number;
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

export const acceptHitRequestfromSearch = (
  data: SearchResult
): AcceptHitRequest => ({
  type: ACCEPT_HIT_REQUEST,
  groupId: data.groupId,
  fromWatcher: false,
  data
});

export const acceptHitRequestFromWatcher = (
  groupId: string,
  delay: number
): AcceptHitRequest => ({
  type: ACCEPT_HIT_REQUEST,
  groupId,
  fromWatcher: true,
  delay
});
