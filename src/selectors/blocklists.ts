import { createSelector } from 'reselect';
import {
  HitBlockMap,
  BlockedHit,
  RequesterBlockMap,
  BlockedRequester
} from '../types';
import {
  hitBlocklistSelector,
  requesterBlocklistSelector,
  hitBlocklistFilterSettingsSelector
} from './index';
import { List } from 'immutable';
import { escapeUserInputForRegex } from 'utils/formatting';
import { createBlocklistFilterFn } from 'utils/blocklist';

export const hitBlocklistFilteredBySearchTerm = createSelector(
  [hitBlocklistSelector, hitBlocklistFilterSettingsSelector],
  (hitBlocklist, { searchTerm }) => {
    if (searchTerm.length === 0) {
      return hitBlocklist;
    }

    const searchRegex = new RegExp(escapeUserInputForRegex(searchTerm), 'i');
    const hitMatchesSearchTerm = createBlocklistFilterFn(
      searchTerm,
      searchRegex
    );

    return hitBlocklist.filter(hitMatchesSearchTerm);
  }
);

export const filteredHitBlocklistIds = createSelector(
  [hitBlocklistFilteredBySearchTerm],
  blockedHits => blockedHits.map((hit: BlockedHit) => hit.groupId)
);

export const blockListsAreEmpty = createSelector(
  [hitBlocklistSelector, requesterBlocklistSelector],
  (blockedHits, blockedRequesters) =>
    blockedHits.isEmpty() && blockedRequesters.isEmpty()
);

export const sortedHitBlocklist = createSelector(
  [hitBlocklistFilteredBySearchTerm],
  (blockedHits: HitBlockMap) =>
    (blockedHits.toList() as List<BlockedHit>).sort(
      (a: BlockedHit, b: BlockedHit) =>
        b.dateBlocked.valueOf() - a.dateBlocked.valueOf()
    ) as List<BlockedHit>
);

export const sortedRequesterBlockList = createSelector(
  [requesterBlocklistSelector],
  (blockedRequesters: RequesterBlockMap) =>
    blockedRequesters
      .sort(
        (a: BlockedRequester, b: BlockedRequester) =>
          b.dateBlocked.valueOf() - a.dateBlocked.valueOf()
      )
      .toList()
);

export const recentlyBlockedRequesters = createSelector(
  [sortedRequesterBlockList],
  (blockedRequesters: List<BlockedRequester>) =>
    blockedRequesters.slice(0, 30) as List<BlockedRequester>
);
