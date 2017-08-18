import * as constants from '../constants';
import { SearchMap } from '../types';

export interface GetHitPageSuccess {
  type: constants.FETCH_HIT_PAGE_SUCCESS;
  data: SearchMap;
}

export interface GetHitPageFailure {
  type: constants.FETCH_HIT_PAGE_FAILURE;
}

export type HitPageAction = GetHitPageSuccess | GetHitPageFailure;

export const getHitPageSuccess = (data: SearchMap): GetHitPageSuccess => ({
  type: constants.FETCH_HIT_PAGE_SUCCESS,
  data
});

export const getHitPageFailure = (): GetHitPageFailure => ({
  type: constants.FETCH_HIT_PAGE_FAILURE
});
