import { createSelector } from 'reselect';
import {
  HitBlockMap,
  BlockedHit,
  RequesterBlockMap,
  BlockedRequester
} from '../types';
import { hitBlocklistSelector, requesterBlocklistSelector } from './index';
import { isOlderThan, isYoungerThan } from 'utils/dates';
import { List } from 'immutable';

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

export const recentlyBlockedRequesters = createSelector(
  [sortedRequesterBlockList],
  (blockedRequesters: List<BlockedRequester>) =>
    blockedRequesters.slice(0, 30) as List<BlockedRequester>
);

export const blockedRequestersOlderThan = (numDaysBefore: number) =>
  createSelector([sortedRequesterBlockList], requesters =>
    requesters.filter(requesterBlockedAfter(numDaysBefore)).toSet()
  );

const requesterBlockedAfter = (daysBefore: number) => (
  requester: BlockedRequester
) => isOlderThan(requester.dateBlocked, daysBefore, new Date());

export const blockedRequestersInLast = (timeInSeconds: number) =>
  createSelector([sortedRequesterBlockList], requesters =>
    requesters.filter(requesterBlockedWithin(timeInSeconds)).toSet()
  );

const requesterBlockedWithin = (timeInSeconds: number) => (
  requester: BlockedRequester
) => isYoungerThan(requester.dateBlocked, timeInSeconds, new Date());
