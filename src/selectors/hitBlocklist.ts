import { createSelector } from 'reselect';
import { RootState, HitBlockMap, BlockedHit } from '../types';

export const hitBlocklistSelector = (state: RootState) => state.hitBlocklist;

export const recentlyBlockedHitIds = createSelector(
  [ hitBlocklistSelector ],
  (blockedHit: HitBlockMap) =>
    blockedHit.map((el: BlockedHit) => el.groupId).slice(0, 20).toArray()
);
