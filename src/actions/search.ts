import * as constants from '../constants';
import { SearchMap } from '../types';

export interface SearchSuccess {
  type: constants.FETCH_HIT_PAGE_SUCCESS;
  data: SearchMap;
}

export interface SearchFailure {
  type: constants.FETCH_HIT_PAGE_FAILURE;
}

export type SearchAction = SearchSuccess | SearchFailure;

export const fetchSearchSuccess = (data: SearchMap): SearchSuccess => ({
  type: constants.FETCH_HIT_PAGE_SUCCESS,
  data
});

export const fetchSearchFailure = (): SearchFailure => ({
  type: constants.FETCH_HIT_PAGE_FAILURE
});
