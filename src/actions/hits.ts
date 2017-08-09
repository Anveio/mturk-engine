import * as constants from '../constants';
import { HitMap } from '../types';

export interface GetHitPageSuccess {
  type: constants.FETCH_HIT_PAGE_SUCCESS;
  data: HitMap;
}

export interface GetHitPageFailure {
  type: constants.FETCH_HIT_PAGE_FAILURE;
}

export type HitPageAction = GetHitPageSuccess | GetHitPageFailure;

export const getHitPageSuccess = (data: HitMap): GetHitPageSuccess => ({
  type: constants.FETCH_HIT_PAGE_SUCCESS,
  data
});

export const getHitPageFailure = (): GetHitPageFailure => ({
  type: constants.FETCH_HIT_PAGE_FAILURE
});
