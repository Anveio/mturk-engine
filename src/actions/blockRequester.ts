import { BLOCK_REQUESTER, UNBLOCK_REQUESTER } from '../constants';
import { BlockedRequester } from '../types';

export interface BlockRequester {
  type: BLOCK_REQUESTER;
  data: BlockedRequester;
}

export interface UnblockRequester {
  type: UNBLOCK_REQUESTER;
  requesterId: string;
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
