import { TOGGLE_SEARCH_RESULT_EXPAND } from '../constants';
import { SearchResult } from '../types';

export interface ToggleSearchResultExpand {
  type: TOGGLE_SEARCH_RESULT_EXPAND;
  hit: SearchResult;
}

export type ExpandAction = ToggleSearchResultExpand;

export const toggleSearchResultExpand = (
  hit: SearchResult
): ToggleSearchResultExpand => ({
  type: TOGGLE_SEARCH_RESULT_EXPAND,
  hit
});
