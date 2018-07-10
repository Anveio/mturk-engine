import { SearchResult } from '../types';
import { SearchSuccess } from '../actions/search';

/**
 * Returns true if a search result in a successful search has an entry that
 * exists in prevSearchResult.
 * @param action
 */
export const resultsThatAppearInBoth = (action: SearchSuccess) => (
  prevSearchResult: SearchResult
): boolean => action.data.has(prevSearchResult.groupId);
