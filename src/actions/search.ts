import * as constants from '../constants';
import { SearchResults } from '../types';

export interface SearchSuccess {
  type: constants.FETCH_HIT_PAGE_SUCCESS;
  data: SearchResults;
}

export interface SearchFailure {
  type: constants.FETCH_HIT_PAGE_FAILURE;
}

export type SearchAction = SearchSuccess | SearchFailure;

export const fetchSearchSuccess = (data: SearchResults): SearchSuccess => ({
  type: constants.FETCH_HIT_PAGE_SUCCESS,
  data
});

export const fetchSearchFailure = (): SearchFailure => ({
  type: constants.FETCH_HIT_PAGE_FAILURE
});
