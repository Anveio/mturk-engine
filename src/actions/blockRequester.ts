import { BLOCK_REQUESTER, UNBLOCK_REQUESTER } from '../constants';
import { BlockedRequester } from '../types';

export interface BlockRequester {
  readonly type: BLOCK_REQUESTER;
  readonly data: BlockedRequester;
}

export interface UnblockRequester {
  readonly type: UNBLOCK_REQUESTER;
  readonly requesterId: string;
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
