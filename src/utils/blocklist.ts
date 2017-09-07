import {
  SearchResult,
  BlockedHit,
  Requester,
  BlockedRequester
} from '../types';

export const blockedHitFactory = (item: SearchResult): BlockedHit => ({
  ...item,
  dateBlocked: new Date()
});

export const blockedRequesterFactory = (item: Requester): BlockedRequester => ({
  ...item,
  dateBlocked: new Date()
});
