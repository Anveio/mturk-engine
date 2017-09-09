import { createSelector } from 'reselect';
import {
  RootState,
  SearchResult,
  SearchResults,
  HitBlockMap,
  RequesterBlockMap,
  SortingOption
} from '../types';
import { sortBy } from '../utils/sorting';

const searchResultSelector = (state: RootState) => state.search;
const sortOptionSelector = (state: RootState) => state.sortingOption;
const hitBlocklistSelector = (state: RootState) => state.hitBlocklist;
const requesterBlocklistSelector = (state: RootState) =>
  state.requesterBlocklist;

export const hideBlockedHitsSelector = createSelector(
  [ searchResultSelector, hitBlocklistSelector ],
  (hits: SearchResults, blockedHits: HitBlockMap) =>
    hits.filter(
      (hit: SearchResult) => !blockedHits.get(hit.groupId)
    ) as SearchResults
);

export const hideBlockedRequestersSelector = createSelector(
  [ searchResultSelector, requesterBlocklistSelector ],
  (hits: SearchResults, blockedRequesters: RequesterBlockMap) =>
    hits.filter(
      (hit: SearchResult) => !blockedRequesters.get(hit.requester.id)
    ) as SearchResults
);

export const hideUnwantedResultsSelector = createSelector(
  [ hideBlockedHitsSelector, hideBlockedRequestersSelector ],
  (
    resultsFilteredByBlockedIds: SearchResults,
    resultsFilteredByBlockedRequesters: SearchResults
  ) =>
    resultsFilteredByBlockedIds.filter(
      (result: SearchResult) =>
        !!resultsFilteredByBlockedRequesters.get(result.groupId)
    ) as SearchResults
);

export const filteredAndSortedResultsSelector = createSelector(
  [ hideUnwantedResultsSelector, sortOptionSelector ],
  (hits: SearchResults, sortingOption: SortingOption) =>
    hits.sort(sortBy(sortingOption)) as SearchResults
);

export const filteredResultsGroupIdSelector = createSelector(
  [ filteredAndSortedResultsSelector ],
  (hits: SearchResults) =>
    hits.map((hit: SearchResult) => hit.groupId).toArray()
);
