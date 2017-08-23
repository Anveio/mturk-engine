import { BLOCK_HIT_GROUP, UNBLOCK_HIT_GROUP } from '../constants';
import { HitBlockMap } from '../types';

export interface BlockHitGroup {
  type: BLOCK_HIT_GROUP;
  data: HitBlockMap;
}

export interface UnblockHitGroup {
  type: UNBLOCK_HIT_GROUP;
  groupId: string;
}

export type BlockAction = BlockHitGroup | UnblockHitGroup;

export const blockHitGroup = (data: HitBlockMap): BlockHitGroup => ({
  type: BLOCK_HIT_GROUP,
  data
});

export const unblockHitGroup = (groupId: string): UnblockHitGroup => ({
  type: UNBLOCK_HIT_GROUP,
  groupId
});
