import { createSelector } from 'reselect';
import { RootState, HitBlockMap, BlockedHit } from '../types';

export const hitBlocklistSelector = (state: RootState) => state.hitBlocklist;

export const sortedHitBlocklist = createSelector(
  [ hitBlocklistSelector ],
  (blockedHits: HitBlockMap) =>
    blockedHits.sort(
      (a: BlockedHit, b: BlockedHit) => +b.dateBlocked - +a.dateBlocked
    )
);

export const recentlyBlockedHitIds = createSelector(
  [ sortedHitBlocklist ],
  (blockedHits: HitBlockMap) =>
    blockedHits.map((el: BlockedHit) => el.groupId).slice(0, 20).toArray()
);
