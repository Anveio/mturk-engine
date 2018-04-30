import {
  REQUESTER_BLOCKLIST_ADD,
  REQUESTER_BLOCKLIST_REMOVE
} from '../constants';
import { BlockedRequester, RequesterId } from '../types';
import { Set } from 'immutable';

export interface BlockRequester {
  readonly type: REQUESTER_BLOCKLIST_ADD;
  readonly data: Set<BlockedRequester>;
}

export interface UnblockRequester {
  readonly type: REQUESTER_BLOCKLIST_REMOVE;
  readonly requesterIds: Set<RequesterId>;
}

export type BlockRequesterAction = BlockRequester | UnblockRequester;

export const blockSingleRequester = (
  requester: BlockedRequester
): BlockRequester => ({
  type: REQUESTER_BLOCKLIST_ADD,
  data: Set([requester])
});

export const unblockSingleRequester = (
  requesterId: string
): UnblockRequester => ({
  type: REQUESTER_BLOCKLIST_REMOVE,
  requesterIds: Set([requesterId])
});

export const unblockMultipleRequesters = (
  requesterIds: Set<RequesterId>
): UnblockRequester => ({
  type: REQUESTER_BLOCKLIST_REMOVE,
  requesterIds
});
