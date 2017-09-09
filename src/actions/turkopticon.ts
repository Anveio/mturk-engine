import { TOpticonMap, Requester } from '../types';
import * as constants from '../constants';

export interface FetchTOpticonRequest {
  type: constants.FETCH_TURKOPTICON_REQUEST;
  data: Requester[];
}

export interface FetchTOpticonSuccess {
  type: constants.FETCH_TURKOPTICON_SUCCESS;
  data: TOpticonMap;
}

export interface FetchTOpticonFailure {
  type: constants.FETCH_TURKOPTICON_FAILURE;
}

export type TOpticonAction = FetchTOpticonSuccess | FetchTOpticonFailure;

export const fetchTOpticonSuccess = (
  data: TOpticonMap
): FetchTOpticonSuccess => ({
  type: constants.FETCH_TURKOPTICON_SUCCESS,
  data
});

export const fetchTOpticonFailure = (): FetchTOpticonFailure => ({
  type: constants.FETCH_TURKOPTICON_FAILURE
});

export const fetchTOpticonRequest = (
  data: Requester[]
): FetchTOpticonRequest => ({
  type: constants.FETCH_TURKOPTICON_REQUEST,
  data
});
