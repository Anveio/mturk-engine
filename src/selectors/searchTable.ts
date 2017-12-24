import { createSelector } from 'reselect';
import {
  RootState,
  SearchResult,
  SearchResults,
  HitBlockMap,
  RequesterBlockMap,
  SortingOption,
  AttributeWeights
} from '../types';
import { hitBlocklistSelector } from './hitBlocklist';
import {
  filterBelowTOThreshold,
  attributeWeightsSelector
} from './turkopticon';
import { sortBy } from '../utils/sorting';

const selectGroupId = (hit: SearchResult) => hit.groupId;

export const searchResultSelector = (state: RootState) => state.search;
export const sortOptionSelector = (state: RootState) => state.sortingOption;
export const requesterBlocklistSelector = (state: RootState) =>
  state.requesterBlocklist;

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
  (hits: SearchResults) => hits.filter((hit: SearchResult) => !hit.markedAsRead)
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

// export const hitsWithUpdatedWeightedAverage = createSelector(
//   [groupNewHitsBeforeOldHits, attributeWeightsSelector],
//   hits =>
//     hits.reduce(
//       (hit: SearchResult) =>
//         hit.requester.turkopticon &&
//         hit.requester.turkopticon.weightedAverageScore
//           ? {
//               ...hit,
//               requester: {
//                 ...hit.requester,
//                 turkopticon: {
//                   ...hit.requester.turkopticon,

//                 }
//               }
//             }
//           : hit
//     )
// );

export const filteredResultsGroupId = createSelector(
  [groupNewHitsBeforeOldHits],
  (hits: SearchResults) => {
    return hits.map(selectGroupId).toList();
  }
);
