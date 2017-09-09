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

export const innerJoinSearchResults = (action: SearchSuccess) => (
  _: SearchResult,
  groupId: string
): boolean => !!action.data.get(groupId);

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
    requester: oldResult.requester
  };
};
