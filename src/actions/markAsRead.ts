import { Set } from 'immutable';
import { MARK_ALL_HITS_AS_READ, MARK_HIT_AS_READ } from '../constants';
import { GroupId } from 'types';

export interface MarkHitAsRead {
  readonly type: MARK_HIT_AS_READ;
  readonly groupId: string;
}

export interface MarkAllHitsAsRead {
  readonly type: MARK_ALL_HITS_AS_READ;
  readonly data: Set<GroupId>;
}

export type MarkAction = MarkHitAsRead | MarkAllHitsAsRead;

export const markHitAsRead = (groupId: string): MarkHitAsRead => ({
  type: MARK_HIT_AS_READ,
  groupId
});

export const markAllHitsAsRead = (data: Set<GroupId>): MarkAllHitsAsRead => ({
  type: MARK_ALL_HITS_AS_READ,
  data
});
