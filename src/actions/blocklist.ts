import { BLOCK_HIT_GROUP, UNBLOCK_HIT_GROUP } from '../constants';
import { HitBlocklistMap } from '../types';

export interface BlockHitGroup {
  type: BLOCK_HIT_GROUP;
  data: HitBlocklistMap;
}

export interface UnblockHitGroup {
  type: UNBLOCK_HIT_GROUP;
  groupId: string;
}

export type BlockAction = BlockHitGroup | UnblockHitGroup;

export const blockHitGroup = (data: HitBlocklistMap): BlockHitGroup => ({
  type: BLOCK_HIT_GROUP,
  data
});

export const unblockHitGroup = (groupId: string): UnblockHitGroup => ({
  type: UNBLOCK_HIT_GROUP,
  groupId
});
