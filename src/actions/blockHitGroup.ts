import { BLOCK_HIT, UNBLOCK_HIT, UNBLOCK_MULTIPLE_HITS } from '../constants';
import { BlockedHit, GroupId } from '../types';
import { Set } from 'immutable';

export interface BlockHit {
  readonly type: BLOCK_HIT;
  readonly data: BlockedHit;
}

export interface UnblockHit {
  readonly type: UNBLOCK_HIT;
  readonly groupId: string;
}

export interface UnblockMultipleHits {
  readonly type: UNBLOCK_MULTIPLE_HITS;
  readonly groupIds: Set<GroupId>;
}

export type BlockHitAction = BlockHit | UnblockHit | UnblockMultipleHits;

export const blockHitGroup = (data: BlockedHit): BlockHit => ({
  type: BLOCK_HIT,
  data
});

export const unblockHitGroup = (groupId: string): UnblockHit => ({
  type: UNBLOCK_HIT,
  groupId
});
