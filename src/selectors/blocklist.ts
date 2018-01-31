import { createSelector } from 'reselect';
import { hitBlocklistSelector, requesterBlocklistSelector } from './index';

export const blockListsAreEmpty = createSelector(
  [hitBlocklistSelector, requesterBlocklistSelector],
  (blockedHits, blockedRequesters) =>
    blockedHits.isEmpty() && blockedRequesters.isEmpty()
);
