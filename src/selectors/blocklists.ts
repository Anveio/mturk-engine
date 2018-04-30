import { createSelector } from 'reselect';
import {
  HitBlockMap,
  BlockedHit,
  RequesterBlockMap,
  BlockedRequester
} from '../types';
import { hitBlocklistSelector, requesterBlocklistSelector } from './index';

export const blockListsAreEmpty = createSelector(
  [hitBlocklistSelector, requesterBlocklistSelector],
  (blockedHits, blockedRequesters) =>
    blockedHits.isEmpty() && blockedRequesters.isEmpty()
);

const sortedHitBlocklist = createSelector(
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

export const sortedRequesterBlockList = createSelector(
  [requesterBlocklistSelector],
  (blockedRequesters: RequesterBlockMap) =>
    blockedRequesters.sort(
      (a: BlockedRequester, b: BlockedRequester) =>
        +b.dateBlocked - +a.dateBlocked
    )
);

export const recentlyBlockedRequesterIds = createSelector(
  [sortedRequesterBlockList],
  (blockedRequesters: RequesterBlockMap) =>
    blockedRequesters
      .map((el: BlockedRequester) => el.id)
      .slice(0, 30)
      .toSet()
);
