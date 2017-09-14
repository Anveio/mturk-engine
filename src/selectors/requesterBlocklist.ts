import { createSelector } from 'reselect';
import { RootState, RequesterBlockMap, BlockedRequester } from '../types';

export const requesterBlocklistSelector = (state: RootState) =>
  state.requesterBlocklist;

export const recentlyBlockedRequesterIds = createSelector(
  [ requesterBlocklistSelector ],
  (blockedHit: RequesterBlockMap) =>
    blockedHit.map((el: BlockedRequester) => el.id).slice(0,30).toArray()
);