import { TOpticonMap, Requester } from '../types';
import * as constants from '../constants';

export interface FetchTOpticonRequest {
  readonly type: constants.FETCH_TURKOPTICON_REQUEST;
  readonly data: Requester[];
}

export interface FetchTOpticonSuccess {
  readonly type: constants.FETCH_TURKOPTICON_SUCCESS;
  readonly data: TOpticonMap;
}

export interface FetchTOpticonFailure {
  readonly type: constants.FETCH_TURKOPTICON_FAILURE;
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
