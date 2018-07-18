import { List } from 'immutable';
import {
  BlockedEntry,
  BlockedHit,
  BlockedRequester,
  Requester,
  SearchResult
} from '../types';
import { DurationUnit, olderThan, youngerThan } from './dates';

export const blockedHitFromSearchResult = (hit: SearchResult): BlockedHit => ({
  groupId: hit.groupId,
  requester: hit.requester,
  title: hit.title,
  dateBlocked: new Date()
});

export const createBlockedRequester = (item: Requester): BlockedRequester => ({
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
}

export const createBlocklistFilterFn = (searchTerm: string, searchRegex: RegExp) => (
  hit: BlockedHit
) =>
  hit.groupId === searchTerm ||
  hit.requester.id === searchTerm ||
  searchRegex.test(hit.title) ||
  searchRegex.test(hit.requester.name);
