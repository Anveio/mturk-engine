import { createSelector } from 'reselect';
import { RootState, RequesterBlockMap, BlockedRequester } from '../types';

export const requesterBlocklistSelector = (state: RootState) =>
  state.requesterBlocklist;

export const sortedRequesterBlockList = createSelector(
  [ requesterBlocklistSelector ],
  (blockedRequesters: RequesterBlockMap) =>
    blockedRequesters.sort(
      (a: BlockedRequester, b: BlockedRequester) =>
        +b.dateBlocked - +a.dateBlocked
    )
);

export const recentlyBlockedRequesterIds = createSelector(
  [ sortedRequesterBlockList ],
  (blockedRequesters: RequesterBlockMap) =>
    blockedRequesters
      .map((el: BlockedRequester) => el.id)
      .slice(0, 30)
      .toArray()
);
