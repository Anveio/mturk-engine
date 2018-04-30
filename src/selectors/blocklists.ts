import { createSelector } from 'reselect';
import {
  HitBlockMap,
  BlockedHit,
  RequesterBlockMap,
  BlockedRequester,
  RequesterId
} from '../types';
import { hitBlocklistSelector, requesterBlocklistSelector } from './index';
import { isOlderThan } from 'utils/dates';
import { Set, List } from 'immutable';

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
    blockedRequesters
      .sort(
        (a: BlockedRequester, b: BlockedRequester) =>
          b.dateBlocked.valueOf() - a.dateBlocked.valueOf()
      )
      .toList()
);

export const recentlyBlockedRequesterIds = createSelector(
  [sortedRequesterBlockList],
  (blockedRequesters: List<BlockedRequester>) =>
    blockedRequesters
      .map((el: BlockedRequester) => el.id)
      .slice(0, 30)
      .toList()
);

export const blockedRequesterIdsOlderThan = (numDaysBefore: number) =>
  createSelector([sortedRequesterBlockList], requesters =>
    requesters
      .filter(requesterIsOlderThan(numDaysBefore))
      .reduce(
        (acc: Set<RequesterId>, el: BlockedRequester) => acc.add(el.id),
        Set([])
      )
  );

const requesterIsOlderThan = (daysBefore: number) => (
  requester: BlockedRequester
) => isOlderThan(requester.dateBlocked, daysBefore, new Date());
