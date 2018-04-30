import { HIT_BLOCKLIST_ADD, HIT_BLOCKLIST_REMOVE } from '../constants';
import { BlockedHit, GroupId } from '../types';
import { Set } from 'immutable';

export interface BlockHit {
  readonly type: HIT_BLOCKLIST_ADD;
  readonly data: Set<BlockedHit>;
}

export interface UnblockHit {
  readonly type: HIT_BLOCKLIST_REMOVE;
  readonly groupIds: Set<GroupId>;
}

export type BlockHitAction = BlockHit | UnblockHit;

export const blockSingleHit = (hit: BlockedHit): BlockHit => ({
  type: HIT_BLOCKLIST_ADD,
  data: Set([hit])
});

export const unblockSingleHit = (groupId: string): UnblockHit => ({
  type: HIT_BLOCKLIST_REMOVE,
  groupIds: Set([groupId])
});

export const blockMultipleHits = (data: Set<BlockedHit>): BlockHit => ({
  type: HIT_BLOCKLIST_ADD,
  data
});

export const unblockMultipleHits = (groupIds: Set<GroupId>): UnblockHit => ({
  type: HIT_BLOCKLIST_REMOVE,
  groupIds
});
