import { createSelector } from 'reselect';
import {
  HitBlockMap,
  BlockedHit,
  RequesterBlockMap,
  BlockedRequester
} from '../types';
import { hitBlocklistSelector, requesterBlocklistSelector } from './index';
import { List } from 'immutable';

export const blockListsAreEmpty = createSelector(
  [hitBlocklistSelector, requesterBlocklistSelector],
  (blockedHits, blockedRequesters) =>
    blockedHits.isEmpty() && blockedRequesters.isEmpty()
);

export const sortedHitBlocklist = createSelector(
  [hitBlocklistSelector],
  (blockedHits: HitBlockMap) =>
    (blockedHits.toList() as List<BlockedHit>).sort(
      (a: BlockedHit, b: BlockedHit) =>
        b.dateBlocked.valueOf() - a.dateBlocked.valueOf()
    ) as List<BlockedHit>
);

export const sortedRequesterBlockList = createSelector(
  [requesterBlocklistSelector],
  (blockedRequesters: RequesterBlockMap) =>
    blockedRequesters
      .sort(
        (a: BlockedRequester, b: BlockedRequester) =>
          b.dateBlocked.valueOf() - a.dateBlocked.valueOf()
      )
      .toList()
);

export const recentlyBlockedRequesters = createSelector(
  [sortedRequesterBlockList],
  (blockedRequesters: List<BlockedRequester>) =>
    blockedRequesters.slice(0, 30) as List<BlockedRequester>
);
