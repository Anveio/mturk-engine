import { createSelector } from 'reselect';
import { RootState, RequesterBlockMap, BlockedRequester } from '../types';

export const requesterBlocklistSelector = (state: RootState) =>
  state.requesterBlocklist;

export const requesterBlocklistGroupIds = createSelector(
  [ requesterBlocklistSelector ],
  (blockedHit: RequesterBlockMap) =>
    blockedHit.map((el: BlockedRequester) => el.id).toArray()
);
