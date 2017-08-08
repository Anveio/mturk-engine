import * as constants from '../constants';
import { HitSet } from '../types';

export interface GetHitPageSuccess {
  type: constants.FETCH_HIT_PAGE_SUCCESS;
  data: HitSet;
}

export interface GetHitPageFailure {
  type: constants.FETCH_HIT_PAGE_FAILURE;
}

export type HitPageAction = GetHitPageSuccess | GetHitPageFailure;

export const getHitPageSuccess = (data: HitSet): GetHitPageSuccess => ({
  type: constants.FETCH_HIT_PAGE_SUCCESS,
  data
});

export const getHitPageFailure = (): GetHitPageFailure => ({
  type: constants.FETCH_HIT_PAGE_FAILURE
});
