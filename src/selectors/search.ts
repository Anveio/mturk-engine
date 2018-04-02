import { createSelector } from 'reselect';
import {
  SearchResult,
  SearchResults,
  HitBlockMap,
  RequesterBlockMap,
  SortingOption,
  AttributeWeights,
  RequesterId
} from '../types';
import {
  filterBelowTOThreshold,
  attributeWeightsSelector
} from './turkopticon';
import { sortBy } from '../utils/sorting';
import {
  searchResultSelector,
  hitBlocklistSelector,
  requesterBlocklistSelector,
  sortOptionSelector
} from './index';
import { noTurkopticon } from '../utils/turkopticon';
import { List } from 'immutable';

const selectGroupId = (hit: SearchResult) => hit.groupId;

export const resultsLengthSelector = createSelector(
  [searchResultSelector],
  (searchResults: SearchResults) => searchResults.size
);

const hideBlockedHits = createSelector(
  [searchResultSelector, hitBlocklistSelector],
  (hits: SearchResults, blockedHits: HitBlockMap) =>
    hits.filter(
      (hit: SearchResult) => !blockedHits.get(hit.groupId)
    ) as SearchResults
);

export const hideBlockedRequesters = createSelector(
  [searchResultSelector, requesterBlocklistSelector],
  (hits: SearchResults, blockedRequesters: RequesterBlockMap) =>
    hits.filter(
      (hit: SearchResult) => !blockedRequesters.get(hit.requester.id)
    ) as SearchResults
);

const hideBlockedRequestersAndHits = createSelector(
  [hideBlockedHits, requesterBlocklistSelector],
  (
    resultsFilteredByBlockedIds: SearchResults,
    blockedRequesters: RequesterBlockMap
  ) =>
    resultsFilteredByBlockedIds.filter(
      (result: SearchResult) => !blockedRequesters.get(result.requester.id)
    ) as SearchResults
);

const filteredAndSortedResults = createSelector(
  [
    hideBlockedRequestersAndHits,
    filterBelowTOThreshold,
    sortOptionSelector,
    attributeWeightsSelector
  ],
  (
    hits: SearchResults,
    aboveThreshold: SearchResults,
    sortingOption: SortingOption,
    weights: AttributeWeights
  ) =>
    hits
      .filter((hit: SearchResult) => aboveThreshold.has(hit.groupId))
      .sort(sortBy(sortingOption, weights))
  // .sort(unreadFirst) as SearchResults
);

export const newResults = createSelector(
  [filteredAndSortedResults],
  (hits: SearchResults) =>
    hits.filter((hit: SearchResult) => !hit.markedAsRead) as SearchResults
);

export const newResultsGroupIdsList = createSelector(
  [newResults],
  (hits: SearchResults) => hits.map(selectGroupId).toList()
);

const markedAsReadResults = createSelector(
  [filteredAndSortedResults],
  (hits: SearchResults) =>
    hits.filter((hit: SearchResult) => !!hit.markedAsRead)
);

const groupNewHitsBeforeOldHits = createSelector(
  [newResults, markedAsReadResults],
  (hits: SearchResults, readHits: SearchResults) => hits.concat(readHits)
);

export const filteredResultsGroupId = createSelector(
  [groupNewHitsBeforeOldHits],
  (hits: SearchResults) => {
    return hits.map(selectGroupId).toList();
  }
);

export const getSearchResultRequesterIds = createSelector(
  [searchResultSelector],
  searchResults =>
    searchResults
      .filter(noTurkopticon)
      .reduce(
        (acc: List<RequesterId>, cur: SearchResult) =>
          acc.push(cur.requester.id),
        List<RequesterId>([])
      )
);
