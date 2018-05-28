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
  filterBelowTopticonThreshold,
  attributeWeightsSelector
} from './turkopticon';
import { sortBy } from '../utils/sorting';
import {
  searchResultsSelector,
  hitBlocklistSelector,
  requesterBlocklistSelector,
  sortOptionSelector
} from './index';
import { noTurkopticon } from '../utils/turkopticon';
import { List } from 'immutable';

const selectGroupId = (hit: SearchResult) => hit.groupId;

export const resultsLengthSelector = createSelector(
  [searchResultsSelector],
  (searchResults: SearchResults) => searchResults.size
);

const hideBlockedHits = createSelector(
  [searchResultsSelector, hitBlocklistSelector],
  (hits: SearchResults, blockedHits: HitBlockMap) =>
    hits.filter(
      (hit: SearchResult) => !blockedHits.has(hit.groupId)
    ) as SearchResults
);

export const hideBlockedRequesters = createSelector(
  [searchResultsSelector, requesterBlocklistSelector],
  (hits: SearchResults, blockedRequesters: RequesterBlockMap) =>
    hits.filter(
      (hit: SearchResult) => !blockedRequesters.has(hit.requester.id)
    ) as SearchResults
);

const hideBlockedRequestersAndHits = createSelector(
  [hideBlockedHits, requesterBlocklistSelector],
  (
    resultsFilteredByBlockedIds: SearchResults,
    blockedRequesters: RequesterBlockMap
  ) =>
    resultsFilteredByBlockedIds.filter(
      (result: SearchResult) => !blockedRequesters.has(result.requester.id)
    ) as SearchResults
);

const filteredAndSortedResults = createSelector(
  [
    hideBlockedRequestersAndHits,
    filterBelowTopticonThreshold,
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
  [searchResultsSelector],
  searchResults =>
    searchResults
      .filter(noTurkopticon)
      .reduce(
        (acc: List<RequesterId>, cur: SearchResult) =>
          acc.push(cur.requester.id),
        List<RequesterId>([])
      )
);
