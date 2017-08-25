import { SEARCH_SUCCESS, SEARCH_FAILURE, SEARCH_REQUEST } from '../constants';
import { SearchResults, SearchOptions } from '../types';

export interface SearchSuccess {
  type: SEARCH_SUCCESS;
  data: SearchResults;
}

export interface SearchFailure {
  type: SEARCH_FAILURE;
}

export interface SearchRequest {
  type: SEARCH_REQUEST;
  options: SearchOptions;
}

export type SearchAction = SearchSuccess | SearchFailure | SearchRequest;

export const searchSuccess = (data: SearchResults): SearchSuccess => ({
  type: SEARCH_SUCCESS,
  data
});

export const searchFailure = (): SearchFailure => ({
  type: SEARCH_FAILURE
});

export const searchRequest = (options: SearchOptions): SearchRequest => ({
  type: SEARCH_REQUEST,
  options
});
