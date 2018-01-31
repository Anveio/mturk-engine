import { SearchResult, RequesterMap } from '../types';
import { SearchSuccess } from '../actions/search';

export const updateTurkopticon = (requesterData: RequesterMap) => (
  hit: SearchResult
): SearchResult => {
  const associatedRequester = requesterData.get(hit.requester.id);

  if (!associatedRequester) {
    return hit;
  } else {
    return {
      ...hit,
      requester: {
        ...hit.requester,
        turkopticon: associatedRequester.turkopticon
      }
    };
  }
};

/**
 * Returns true if a search result in a successful search has an entry that
 * exists in prevSearchResult.
 * @param action
 */
export const resultsThatAppearInBoth = (action: SearchSuccess) => (
  prevSearchResult: SearchResult
): boolean => action.data.has(prevSearchResult.groupId);

export const conflictsUseOldMarkedAsReadProp = (
  oldResult: SearchResult,
  newResult: SearchResult
): SearchResult => ({
  ...newResult,
  markedAsRead: oldResult.markedAsRead,
  requester: oldResult.requester
});

export const markAsRead = (hit: SearchResult): SearchResult => ({
  ...hit,
  markedAsRead: true
});

export const keepReadResults = (hit: SearchResult) => !!hit.markedAsRead;
