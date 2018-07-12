import {
  HIT_BLOCKLIST_ADD,
  HIT_BLOCKLIST_REMOVE,
  HIT_BLOCKLIST_ADD_MULTIPLE,
  HIT_BLOCKLIST_REMOVE_MULTIPLE
} from '../constants';
import { BlockedHit, GroupId } from '../types';
import { Set } from 'immutable';

export interface BlockHit {
  readonly type: HIT_BLOCKLIST_ADD;
  readonly data: BlockedHit;
}

export interface BlockMultipleHits {
  readonly type: HIT_BLOCKLIST_ADD_MULTIPLE;
  readonly data: Set<BlockedHit>;
}

export interface UnblockHit {
  readonly type: HIT_BLOCKLIST_REMOVE;
  readonly groupId: GroupId;
}

export interface UnblockMultipleHits {
  readonly type: HIT_BLOCKLIST_REMOVE_MULTIPLE;
  readonly groupIds: Set<GroupId>;
}

export type BlockHitAction =
  | BlockHit
  | BlockMultipleHits
  | UnblockHit
  | UnblockMultipleHits;

export const blockSingleHit = (hit: BlockedHit): BlockHit => ({
  type: HIT_BLOCKLIST_ADD,
  data: hit
});

export const unblockSingleHit = (groupId: GroupId): UnblockHit => ({
  type: HIT_BLOCKLIST_REMOVE,
  groupId
});

export const blockMultipleHits = (
  data: Set<BlockedHit>
): BlockMultipleHits => ({
  type: HIT_BLOCKLIST_ADD_MULTIPLE,
  data
});

export const unblockMultipleHits = (
  groupIds: Set<GroupId>
): UnblockMultipleHits => ({
  type: HIT_BLOCKLIST_REMOVE_MULTIPLE,
  groupIds
});
