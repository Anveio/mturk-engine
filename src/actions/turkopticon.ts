import { TOpticonResponse } from '../types';
import { Map } from 'immutable';
import * as constants from '../constants';

export interface FetchTOpticonSuccess {
  type: constants.FETCH_TURKOPTICON_SUCCESS;
  data: Map<string, TOpticonResponse>;
}

export interface FetchTOpticonFailure {
  type: constants.FETCH_HIT_PAGE_FAILURE;
}

export type TOpticonAction = FetchTOpticonSuccess | FetchTOpticonFailure;

export const fetchTOpticonSuccess = (
  data: Map<string, TOpticonResponse>
): FetchTOpticonSuccess => ({
  type: constants.FETCH_TURKOPTICON_SUCCESS,
  data
});

export const fetchTOpticonFailure = (): FetchTOpticonFailure => ({
  type: constants.FETCH_HIT_PAGE_FAILURE
});
