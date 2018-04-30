import {
  BLOCK_REQUESTER,
  UNBLOCK_REQUESTER,
  UNBLOCK_MULTIPLE_REQUESTERS
} from '../constants';
import { BlockedRequester, RequesterId } from '../types';
import { Set } from 'immutable';

export interface BlockRequester {
  readonly type: BLOCK_REQUESTER;
  readonly data: BlockedRequester;
}

export interface UnblockRequester {
  readonly type: UNBLOCK_REQUESTER;
  readonly requesterId: string;
}

export interface UnblockMultipleRequesters {
  readonly type: UNBLOCK_MULTIPLE_REQUESTERS;
  readonly requesterIds: Set<RequesterId>;
}

export type BlockRequesterAction =
  | BlockRequester
  | UnblockRequester
  | UnblockMultipleRequesters;

export const blockRequester = (data: BlockedRequester): BlockRequester => ({
  type: BLOCK_REQUESTER,
  data
});

export const unblockRequester = (requesterId: string): UnblockRequester => ({
  type: UNBLOCK_REQUESTER,
  requesterId
});

export const unblockMultipleRequesters = (
  requesterIds: Set<RequesterId>
): UnblockMultipleRequesters => ({
  type: UNBLOCK_MULTIPLE_REQUESTERS,
  requesterIds
});
