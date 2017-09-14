import { createSelector } from 'reselect';
import { hitBlocklistSelector } from './hitBlocklist';
import { requesterBlocklistSelector } from './requesterBlocklist';

export const blockListsAreEmpty = createSelector(
  [ hitBlocklistSelector, requesterBlocklistSelector ],
  (blockedHits, blockedRequesters) =>
    blockedHits.isEmpty() && blockedRequesters.isEmpty()
);
