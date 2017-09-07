import { BLOCK_HIT_GROUP, UNBLOCK_HIT_GROUP } from '../constants';
import { BlockedHit } from '../types';

export interface BlockHitGroup {
  type: BLOCK_HIT_GROUP;
  data: BlockedHit;
}

export interface UnblockHitGroup {
  type: UNBLOCK_HIT_GROUP;
  groupId: string;
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
