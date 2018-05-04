import { List, Set } from 'immutable';
import {
  BlockedEntry,
  BlockedHit,
  BlockedRequester,
  Requester,
  SearchResult
} from '../types';

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

export interface BlocklistProps<T extends BlockedEntry> {
  // recent needs to be displayed in order and Sets dont have a defined iteration order.
  readonly recent: List<T>;
  readonly entries: {
    readonly inThePast: {
      readonly hour: Set<T>;
      readonly day: Set<T>;
      readonly week: Set<T>;
      readonly month: Set<T>;
    };
    readonly olderThan: {
      readonly thirtyDays: Set<T>;
      readonly sixtyDays: Set<T>;
      readonly ninetyDays: Set<T>;
    };
  };
}
