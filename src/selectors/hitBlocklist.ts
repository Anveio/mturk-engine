import { createSelector } from 'reselect';
import { HitBlockMap, BlockedHit } from '../types';
import { hitBlocklistSelector } from './index';

export const sortedHitBlocklist = createSelector(
  [hitBlocklistSelector],
  (blockedHits: HitBlockMap) =>
    blockedHits.sort(
      (a: BlockedHit, b: BlockedHit) => +b.dateBlocked - +a.dateBlocked
    )
);

export const recentlyBlockedHitIds = createSelector(
  [sortedHitBlocklist],
  (blockedHits: HitBlockMap) =>
    blockedHits
      .map((el: BlockedHit) => el.groupId)
      .slice(0, 20)
      .toArray()
);
