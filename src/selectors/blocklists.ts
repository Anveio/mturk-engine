import { createSelector } from 'reselect';
import {
  HitBlockMap,
  BlockedHit,
  RequesterBlockMap,
  BlockedRequester,
  BlockedEntry
} from '../types';
import { hitBlocklistSelector, requesterBlocklistSelector } from './index';
import { isOlderThan, isYoungerThan, DurationUnit } from 'utils/dates';
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

export const recentlyBlockedHits = createSelector(
  [sortedHitBlocklist],
  (blockedHits: HitBlockMap) =>
    blockedHits.toList().slice(0, 20) as List<BlockedHit>
);

const blockedAfter = <T extends BlockedEntry>(
  daysBefore: number,
  unit: DurationUnit
) => (entry: T) => isOlderThan(entry.dateBlocked, daysBefore, new Date(), unit);

const blockedWithin = <T extends BlockedEntry>(
  timeInSeconds: number,
  unit: DurationUnit
) => (entry: T) =>
  isYoungerThan(entry.dateBlocked, timeInSeconds, new Date(), unit);

export const blockedHitsOlderThan = (
  numDaysBefore: number,
  unit: DurationUnit
) =>
  createSelector([sortedHitBlocklist], hits =>
    hits.filter(blockedAfter<BlockedHit>(numDaysBefore, unit)).toSet()
  );

export const blockedHitsInLast = (time: number, unit: DurationUnit) =>
  createSelector([sortedHitBlocklist], hits =>
    hits.filter(blockedWithin<BlockedHit>(time, unit)).toSet()
  );

export const sortedRequesterBlockList = createSelector(
  [requesterBlocklistSelector],
  (blockedRequesters: RequesterBlockMap) =>
    blockedRequesters.sort(
      (a: BlockedRequester, b: BlockedRequester) =>
        b.dateBlocked.valueOf() - a.dateBlocked.valueOf()
    )
);

export const recentlyBlockedRequesters = createSelector(
  [sortedRequesterBlockList],
  (blockedRequesters: RequesterBlockMap) =>
    blockedRequesters.toList().slice(0, 30) as List<BlockedRequester>
);

export const blockedRequestersOlderThan = (
  numDaysBefore: number,
  unit: DurationUnit
) =>
  createSelector([sortedRequesterBlockList], requesters =>
    requesters
      .filter(blockedAfter<BlockedRequester>(numDaysBefore, unit))
      .toSet()
  );

export const blockedRequestersInLast = (
  timeInSeconds: number,
  unit: DurationUnit
) =>
  createSelector([sortedRequesterBlockList], requesters =>
    requesters
      .filter(blockedWithin<BlockedRequester>(timeInSeconds, unit))
      .toSet()
  );
