import {
  TOGGLE_SEARCH_RESULT_EXPAND,
  COLLAPSE_ALL_SEARCH_RESULTS
} from '../constants';
import { SearchResult } from '../types';

export interface ToggleSearchResultExpand {
  type: TOGGLE_SEARCH_RESULT_EXPAND;
  hit: SearchResult;
}

export interface CollapseAllResults {
  type: COLLAPSE_ALL_SEARCH_RESULTS;
}

export type ExpandAction = ToggleSearchResultExpand | CollapseAllResults;

export const toggleSearchResultExpand = (
  hit: SearchResult
): ToggleSearchResultExpand => ({
  type: TOGGLE_SEARCH_RESULT_EXPAND,
  hit
});

export const collapseAllResults = (): CollapseAllResults => ({
  type: COLLAPSE_ALL_SEARCH_RESULTS
});
