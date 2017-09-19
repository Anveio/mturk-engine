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

export const searchResultSelector = (state: RootState) => state.search;
export const sortOptionSelector = (state: RootState) => state.sortingOption;
export const requesterBlocklistSelector = (state: RootState) =>
  state.requesterBlocklist;

export const resultsLengthSelector = createSelector(
  [ searchResultSelector ],
  (searchResults: SearchResults) => searchResults.size
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
      .sort(sortBy(sortingOption)) as SearchResults
);

export const newResults = createSelector(
  [ filteredAndSortedResults ],
  (hits: SearchResults) => hits.filter((hit: SearchResult) => !hit.markedAsRead)
);

export const newResultsGroupIds = createSelector(
  [ newResults ],
  (hits: SearchResults) =>
    hits.map((hit: SearchResult) => hit.groupId).toArray()
);

export const filteredResultsGroupId = createSelector(
  [ filteredAndSortedResults ],
  (hits: SearchResults) =>
    hits.map((hit: SearchResult) => hit.groupId).toArray()
);
