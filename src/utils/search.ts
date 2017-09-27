import { SearchResult, TOpticonMap } from '../types';
import { SearchSuccess } from '../actions/search';

export const updateTurkopticon = (data: TOpticonMap) => (
  hit: SearchResult
): SearchResult => ({
  ...hit,
  requester: {
    ...hit.requester,
    turkopticon: data.get(hit.requester.id)
  }
});

export const rejectInvalidGroupId = (hit: SearchResult) =>
  !hit.groupId.startsWith('[Error:');

/**
 * Returns true if a search result in a successful search has an entry that 
 * exists in prevSearchResult. 
 * @param action 
 */
export const resultsThatAppearInBoth = (action: SearchSuccess) => (
  prevSearchResult: SearchResult
): boolean => action.data.has(prevSearchResult.groupId);

export const conflictsUpdateOnlyIndexes = (
  oldResult: SearchResult,
  newResult: SearchResult
): SearchResult => {
  return {
    ...oldResult,
    index: newResult.index,
    requester: oldResult.requester
  };
};

export const conflictsUseOldExpandedProp = (
  oldResult: SearchResult,
  newResult: SearchResult
): SearchResult => {
  return {
    ...newResult,
    expanded: oldResult.expanded,
    markedAsRead: oldResult.markedAsRead,
    requester: oldResult.requester
  };
};

export const markAsRead = (hit: SearchResult): SearchResult => ({
  ...hit,
  markedAsRead: new Date()
});
