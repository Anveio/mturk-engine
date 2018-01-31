import { createSelector } from 'reselect';
import { RequesterBlockMap, BlockedRequester } from '../types';
import { requesterBlocklistSelector } from './index';

export const sortedRequesterBlockList = createSelector(
  [requesterBlocklistSelector],
  (blockedRequesters: RequesterBlockMap) =>
    blockedRequesters.sort(
      (a: BlockedRequester, b: BlockedRequester) =>
        +b.dateBlocked - +a.dateBlocked
    )
);

export const recentlyBlockedRequesterIds = createSelector(
  [sortedRequesterBlockList],
  (blockedRequesters: RequesterBlockMap) =>
    blockedRequesters
      .map((el: BlockedRequester) => el.id)
      .slice(0, 30)
      .toArray()
);
