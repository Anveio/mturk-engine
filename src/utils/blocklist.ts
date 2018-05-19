import { List } from 'immutable';
import {
  BlockedEntry,
  BlockedHit,
  BlockedRequester,
  Requester,
  SearchResult
} from '../types';
import { DurationUnit, olderThan, youngerThan } from './dates';

export const blockedHitFactory = (hit: SearchResult): BlockedHit => ({
  groupId: hit.groupId,
  requester: hit.requester,
  title: hit.title,
  dateBlocked: new Date()
});

export const blockedRequesterFactory = (item: Requester): BlockedRequester => ({
  ...item,
  dateBlocked: new Date()
});

export const blockedAfter = <T extends BlockedEntry>(
  now: Date,
  duration: number,
  unit: DurationUnit
) => (entry: T) => olderThan(entry.dateBlocked, duration, now, unit);

export const blockedWithin = <T extends BlockedEntry>(
  now: Date,
  duration: number,
  unit: DurationUnit
) => (entry: T) => youngerThan(entry.dateBlocked, duration, now, unit);

export interface BlocklistProps<T extends BlockedEntry> {
  readonly blockedEntries: List<T>;
  // recent needs to be displayed in order and Sets dont have a defined iteration order.
  // readonly recent: List<T>;
  // readonly entries: {
  //   readonly inThePast: {
  //     readonly hour: Set<T>;
  //     readonly day: Set<T>;
  //     readonly week: Set<T>;
  //     readonly month: Set<T>;
  //   };
  //   readonly olderThan: {
  //     readonly thirtyDays: Set<T>;
  //     readonly sixtyDays: Set<T>;
  //     readonly ninetyDays: Set<T>;
  //   };
  // };
}
