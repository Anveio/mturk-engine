import {
  BLOCK_REQUESTER,
  UNBLOCK_REQUESTER,
  UNBLOCK_MULTIPLE_REQUESTERS
} from '../constants';
import { BlockedRequester, RequesterId } from '../types';

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

export type BlockRequesterAction = BlockRequester | UnblockRequester;

export const blockRequester = (data: BlockedRequester): BlockRequester => ({
  type: BLOCK_REQUESTER,
  data
});

export const unblockRequester = (requesterId: string): UnblockRequester => ({
  type: UNBLOCK_REQUESTER,
  requesterId
});
