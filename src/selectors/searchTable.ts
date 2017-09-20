import { createSelector } from 'reselect';
import {
  RootState,
  SearchResult,
  SearchResults,
  HitBlockMap,
  RequesterBlockMap,
  SortingOption
} from '../types';
import { hitBlocklistSelector } from './hitBlocklist';
import { filterBelowTOThreshold } from './turkopticon';
import { sortBy } from '../utils/sorting';
import { noTurkopticon } from '../utils/turkopticon';

const selectGroupId = (hit: SearchResult) => hit.groupId;

export const searchResultSelector = (state: RootState) => state.search;
export const sortOptionSelector = (state: RootState) => state.sortingOption;
export const requesterBlocklistSelector = (state: RootState) =>
  state.requesterBlocklist;

export const resultsLengthSelector = createSelector(
  [ searchResultSelector ],
  (searchResults: SearchResults) => searchResults.size
);

export const hitIdsWithNoTO = createSelector(
  [ searchResultSelector ],
  (searchResults: SearchResults) => {
    searchResults.filter(noTurkopticon).map(selectGroupId).toArray();
  }
);

export const hideBlockedHits = createSelector(
  [ searchResultSelector, hitBlocklistSelector ],
  (hits: SearchResults, blockedHits: HitBlockMap) =>
    hits.filter(
      (hit: SearchResult) => !blockedHits.get(hit.groupId)
    ) as SearchResults
);

export const hideBlockedRequesters = createSelector(
  [ searchResultSelector, requesterBlocklistSelector ],
  (hits: SearchResults, blockedRequesters: RequesterBlockMap) =>
    hits.filter(
      (hit: SearchResult) => !blockedRequesters.get(hit.requester.id)
    ) as SearchResults
);

export const hideBlockedRequestersAndHits = createSelector(
  [ hideBlockedHits, requesterBlocklistSelector ],
  (
    resultsFilteredByBlockedIds: SearchResults,
    blockedRequesters: RequesterBlockMap
  ) =>
    resultsFilteredByBlockedIds.filter(
      (result: SearchResult) => !blockedRequesters.get(result.requester.id)
    ) as SearchResults
);

export const filteredAndSortedResults = createSelector(
  [ hideBlockedRequestersAndHits, filterBelowTOThreshold, sortOptionSelector ],
  (
    hits: SearchResults,
    aboveThreshold: SearchResults,
    sortingOption: SortingOption
  ) =>
    hits
      .filter((hit: SearchResult) => aboveThreshold.has(hit.groupId))
      .sort(sortBy(sortingOption))
  // .sort(unreadFirst) as SearchResults
);

export const newResults = createSelector(
  [ filteredAndSortedResults ],
  (hits: SearchResults) => hits.filter((hit: SearchResult) => !hit.markedAsRead)
);

export const markedAsReadResults = createSelector(
  [ filteredAndSortedResults ],
  (hits: SearchResults) =>
    hits.filter((hit: SearchResult) => !!hit.markedAsRead)
);

export const newResultsGroupIds = createSelector(
  [ newResults ],
  (hits: SearchResults) => hits.map(selectGroupId).toArray()
);

export const groupNewHitsBeforeOldHits = createSelector(
  [ newResults, markedAsReadResults ],
  (hits: SearchResults, readHits: SearchResults) => hits.concat(readHits)
);

export const filteredResultsGroupId = createSelector(
  [ groupNewHitsBeforeOldHits ],
  (hits: SearchResults) => hits.map(selectGroupId).toList()
);
