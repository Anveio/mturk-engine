import {
  SearchResult,
  BlockedHit,
  Requester,
  BlockedRequester
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
