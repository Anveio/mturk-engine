import { createSelector } from 'reselect';
import { RootState, HitBlockMap, BlockedHit } from '../types';

export const hitBlocklistSelector = (state: RootState) => state.hitBlocklist;

export const hitBlocklistGroupIds = createSelector(
  [ hitBlocklistSelector ],
  (blockedHit: HitBlockMap) =>
    blockedHit.map((el: BlockedHit) => el.groupId).toArray()
);
