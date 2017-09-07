import { TOpticonData, TurkopticonMap, SearchResults } from '../types';
import { Map } from 'immutable';
import * as constants from '../constants';

export interface FetchTOpticonRequest {
  type: constants.FETCH_TURKOPTICON_REQUEST;
  data: SearchResults;
}

export interface FetchTOpticonSuccess {
  type: constants.FETCH_TURKOPTICON_SUCCESS;
  data: Map<string, TOpticonData>;
}

export interface FetchTOpticonFailure {
  type: constants.FETCH_TURKOPTICON_FAILURE;
}

export type TOpticonAction = FetchTOpticonSuccess | FetchTOpticonFailure;

export const fetchTOpticonSuccess = (
  data: TurkopticonMap
): FetchTOpticonSuccess => ({
  type: constants.FETCH_TURKOPTICON_SUCCESS,
  data
});

export const fetchTOpticonFailure = (): FetchTOpticonFailure => ({
  type: constants.FETCH_TURKOPTICON_FAILURE
});

export const fetchTOpticonRequest = (
  data: SearchResults
): FetchTOpticonRequest => ({
  type: constants.FETCH_TURKOPTICON_REQUEST,
  data
});
