import { SearchResult, Requester } from '../types';
import { SearchSuccess } from '../actions/search';
import { Map } from 'immutable';

export const updateTurkopticon = (data: Map<string, Requester>) => (
  hit: SearchResult
): SearchResult => ({
  ...hit,
  requester: {
    ...hit.requester,
    turkopticon:
      data.get(hit.requester.id) && data.get(hit.requester.id).turkopticon
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
  return { ...oldResult, index: newResult.index };
};

export const conflictsUseOldExpandedProp = (
  oldResult: SearchResult,
  newResult: SearchResult
): SearchResult => {
  return { ...newResult, expanded: oldResult.expanded };
};
