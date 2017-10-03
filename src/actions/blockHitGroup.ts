import { BLOCK_HIT_GROUP, UNBLOCK_HIT_GROUP } from '../constants';
import { BlockedHit } from '../types';

export interface BlockHitGroup {
  readonly type: BLOCK_HIT_GROUP;
  readonly data: BlockedHit;
}

export interface UnblockHitGroup {
  readonly type: UNBLOCK_HIT_GROUP;
  readonly groupId: string;
}

export type BlockHitAction = BlockHitGroup | UnblockHitGroup;

export const blockHitGroup = (data: BlockedHit): BlockHitGroup => ({
  type: BLOCK_HIT_GROUP,
  data
});

export const unblockHitGroup = (groupId: string): UnblockHitGroup => ({
  type: UNBLOCK_HIT_GROUP,
  groupId
});
