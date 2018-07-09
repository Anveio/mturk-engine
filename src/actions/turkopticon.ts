import { List } from 'immutable';
import { RequesterMap, RequesterId } from '../types';
import {
  FETCH_TURKOPTICON_REQUEST,
  FETCH_TURKOPTICON_SUCCESS,
  FETCH_TURKOPTICON_FAILURE
} from '../constants';

export interface FetchTOpticonRequest {
  readonly type: FETCH_TURKOPTICON_REQUEST;
  readonly data: List<RequesterId>;
}

export interface FetchTOpticonSuccess {
  readonly type: FETCH_TURKOPTICON_SUCCESS;
  readonly data: RequesterMap;
}

export interface FetchTOpticonFailure {
  readonly type: FETCH_TURKOPTICON_FAILURE;
}

export type TOpticonAction = FetchTOpticonSuccess | FetchTOpticonFailure;

export const fetchTOpticonSuccess = (
  data: RequesterMap
): FetchTOpticonSuccess => ({
  type: FETCH_TURKOPTICON_SUCCESS,
  data
});

export const fetchTOpticonFailure = (): FetchTOpticonFailure => ({
  type: FETCH_TURKOPTICON_FAILURE
});

export const fetchTOpticonRequest = (
  data: List<RequesterId>
): FetchTOpticonRequest => ({
  type: FETCH_TURKOPTICON_REQUEST,
  data
});
