import { SearchResult } from '../types';
import { SearchSuccess } from '../actions/search';
import { FetchTOpticonSuccess } from '../actions/turkopticon';

export const updateTurkopticon = (action: FetchTOpticonSuccess) => (
  hit: SearchResult
): SearchResult => ({
  ...hit,
  turkopticon: action.data.get(hit.requesterId)
});

export const innerJoinSearchResults = (action: SearchSuccess) => (
  _: SearchResult,
  groupId: string
): boolean => !!action.data.get(groupId);

export const conflictsUpdateOnlyIndexes = (
  oldResult: SearchResult,
  newResult: SearchResult
): SearchResult => {
  return { ...oldResult, index: newResult.index };
};

export const conflictsUseOldExpandedProp = (
  oldResult: SearchResult,
  newResult: SearchResult
): SearchResult => {
  return { ...newResult, expanded: oldResult.expanded };
};
