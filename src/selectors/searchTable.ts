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
  [ hideBlockedHits, hideBlockedRequesters ],
  (
    resultsFilteredByBlockedIds: SearchResults,
    resultsFilteredByBlockedRequesters: SearchResults
  ) =>
    resultsFilteredByBlockedIds.filter(
      (result: SearchResult) =>
        !!resultsFilteredByBlockedRequesters.get(result.groupId)
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
