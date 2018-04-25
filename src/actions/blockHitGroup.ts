import { BLOCK_HIT, UNBLOCK_HIT } from '../constants';
import { BlockedHit } from '../types';

export interface BlockHit {
  readonly type: BLOCK_HIT;
  readonly data: BlockedHit;
}

export interface UnblockHit {
  readonly type: UNBLOCK_HIT;
  readonly groupId: string;
}

export type BlockHitAction = BlockHit | UnblockHit;

export const blockHitGroup = (data: BlockedHit): BlockHit => ({
  type: BLOCK_HIT,
  data
});

export const unblockHitGroup = (groupId: string): UnblockHit => ({
  type: UNBLOCK_HIT,
  groupId
});
