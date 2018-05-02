import { createSelector } from 'reselect';
import {
  HitBlockMap,
  BlockedHit,
  RequesterBlockMap,
  BlockedRequester,
  BlockedEntry
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
    blockedHits
      .sort((a: BlockedHit, b: BlockedHit) => +b.dateBlocked - +a.dateBlocked)
      .toList()
);

export const recentlyBlockedHits = createSelector(
  [sortedHitBlocklist],
  (blockedHits: List<BlockedHit>) =>
    blockedHits.slice(0, 20) as List<BlockedHit>
);

const blockedAfter = <T extends BlockedEntry>(daysBefore: number) => (
  entry: T
) => isOlderThan(entry.dateBlocked, daysBefore, new Date());

const blockedWithin = <T extends BlockedEntry>(timeInSeconds: number) => (
  entry: T
) => isYoungerThan(entry.dateBlocked, timeInSeconds, new Date());

export const blockedHitsOlderThan = (numDaysBefore: number) =>
  createSelector([sortedHitBlocklist], hits =>
    hits.filter(blockedAfter<BlockedHit>(numDaysBefore)).toSet()
  );

export const blockedHitsInLast = (timeInSeconds: number) =>
  createSelector([sortedHitBlocklist], hits =>
    hits.filter(blockedWithin<BlockedHit>(timeInSeconds)).toSet()
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
    requesters.filter(blockedAfter<BlockedRequester>(numDaysBefore)).toSet()
  );

export const blockedRequestersInLast = (timeInSeconds: number) =>
  createSelector([sortedRequesterBlockList], requesters =>
    requesters.filter(blockedWithin<BlockedRequester>(timeInSeconds)).toSet()
  );
