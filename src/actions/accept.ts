import {
  ACCEPT_HIT_SUCCESS,
  ACCEPT_HIT_FAILURE,
  ACCEPT_HIT_REQUEST,
  ACCEPT_HIT_FROM_WATCHER
} from '../constants';
import { SearchResult, QueueItem, Watcher } from '../types';

export interface AcceptHitSuccess {
  readonly type: ACCEPT_HIT_SUCCESS;
  readonly data: QueueItem;
  readonly groupId: string;
  readonly fromWatcher: boolean;
}
export interface AcceptHitFailure {
  readonly type: ACCEPT_HIT_FAILURE;
  readonly fromWatcher: boolean;
  readonly groupId: string;
}

export interface AcceptHitRequest {
  readonly type: ACCEPT_HIT_REQUEST;
  readonly groupId: string;
  readonly searchResult: SearchResult;
}

export interface AcceptHitRequestFromWatcher {
  readonly type: ACCEPT_HIT_FROM_WATCHER;
  readonly groupId: string;
  readonly watcher: Watcher;
}

export type AcceptAction =
  | AcceptHitSuccess
  | AcceptHitFailure
  | AcceptHitRequest
  | AcceptHitRequestFromWatcher;

export const acceptHitSuccess = (data: QueueItem): AcceptHitSuccess => ({
  type: ACCEPT_HIT_SUCCESS,
  data,
  groupId: data.groupId,
  fromWatcher: false
});

export const acceptHitSuccessFromWatcher = (
  data: QueueItem
): AcceptHitSuccess => ({
  type: ACCEPT_HIT_SUCCESS,
  data,
  groupId: data.groupId,
  fromWatcher: true
});

export const acceptHitFailure = (groupId: string): AcceptHitFailure => ({
  type: ACCEPT_HIT_FAILURE,
  groupId,
  fromWatcher: false
});

export const acceptHitFailureFromWatcher = (
  groupId: string
): AcceptHitFailure => ({
  type: ACCEPT_HIT_FAILURE,
  groupId,
  fromWatcher: true
});

export const acceptHitRequestfromSearch = (
  searchResult: SearchResult
): AcceptHitRequest => ({
  type: ACCEPT_HIT_REQUEST,
  groupId: searchResult.groupId,
  searchResult
});

export const acceptHitRequestFromWatcher = (
  groupId: string,
  watcher: Watcher
): AcceptHitRequestFromWatcher => ({
  type: ACCEPT_HIT_FROM_WATCHER,
  groupId,
  watcher
});
