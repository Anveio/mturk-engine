import * as constants from '../constants';
import { SearchMap } from '../types';

export interface FetchSearchSuccess {
  type: constants.FETCH_HIT_PAGE_SUCCESS;
  data: SearchMap;
}

export interface FetchSearchFailure {
  type: constants.FETCH_HIT_PAGE_FAILURE;
}

export type SearchAction = FetchSearchSuccess | FetchSearchFailure;

export const fetchSearchSuccess = (data: SearchMap): FetchSearchSuccess => ({
  type: constants.FETCH_HIT_PAGE_SUCCESS,
  data
});

export const fetchSearchFailure = (): FetchSearchFailure => ({
  type: constants.FETCH_HIT_PAGE_FAILURE
});
