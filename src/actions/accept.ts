import {
  ACCEPT_HIT_SUCCESS,
  ACCEPT_HIT_FAILURE,
  ACCEPT_HIT_REQUEST,
  ACCEPT_HIT_FROM_WATCHER
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
  readonly searchResult: SearchResult;
}

export interface AcceptHitRequestFromWatcher {
  readonly type: ACCEPT_HIT_FROM_WATCHER;
  readonly groupId: string;
}

export type AcceptAction =
  | AcceptHitSuccess
  | AcceptHitFailure
  | AcceptHitRequest
  | AcceptHitRequestFromWatcher;

export const acceptHitSuccess = (data: QueueItem): AcceptHitSuccess => ({
  type: ACCEPT_HIT_SUCCESS,
  data
});

export const acceptHitFailure = (): AcceptHitFailure => ({
  type: ACCEPT_HIT_FAILURE
});

export const acceptHitRequestfromSearch = (
  searchResult: SearchResult
): AcceptHitRequest => ({
  type: ACCEPT_HIT_REQUEST,
  groupId: searchResult.groupId,
  fromWatcher: false,
  searchResult
});

export const acceptHitRequestFromWatcher = (
  groupId: string
): AcceptHitRequestFromWatcher => ({
  type: ACCEPT_HIT_FROM_WATCHER,
  groupId
});
