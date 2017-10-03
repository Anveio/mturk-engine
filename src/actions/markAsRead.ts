import { MARK_ALL_HITS_AS_READ, MARK_HIT_AS_READ } from '../constants';

export interface MarkHitAsRead {
  readonly type: MARK_HIT_AS_READ;
  readonly groupId: string;
}

export interface MarkAllHitsAsRead {
  type: MARK_ALL_HITS_AS_READ;
}

export type MarkAction = MarkHitAsRead | MarkAllHitsAsRead;

export const markHitAsRead = (groupId: string): MarkHitAsRead => ({
  type: MARK_HIT_AS_READ,
  groupId
});

export const markAllHitsAsRead = (): MarkAllHitsAsRead => ({
  type: MARK_ALL_HITS_AS_READ
});
