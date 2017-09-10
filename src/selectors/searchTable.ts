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
import { sortBy } from '../utils/sorting';

const searchResultSelector = (state: RootState) => state.search;
const sortOptionSelector = (state: RootState) => state.sortingOption;
const requesterBlocklistSelector = (state: RootState) =>
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

export const hideUnwantedResults = createSelector(
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
  [ hideUnwantedResults, sortOptionSelector ],
  (hits: SearchResults, sortingOption: SortingOption) =>
    hits.sort(sortBy(sortingOption)) as SearchResults
);

export const filteredResultsGroupId = createSelector(
  [ filteredAndSortedResults ],
  (hits: SearchResults) =>
    hits.map((hit: SearchResult) => hit.groupId).toArray()
);
