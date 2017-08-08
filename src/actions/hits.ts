import * as constants from '../constants';
import { Hit } from '../types';

export interface GetHitPageSuccess {
  type: constants.FETCH_HIT_PAGE_SUCCESS;
  data: Hit[];
}

export interface GetHitPageFailure {
  type: constants.FETCH_HIT_PAGE_FAILURE;
}

export type HitPageAction = GetHitPageSuccess | GetHitPageFailure;

export const getHitPageSuccess = (data: Hit[]): GetHitPageSuccess => ({
  type: constants.FETCH_HIT_PAGE_SUCCESS,
  data
});

export const getHitPageFailure = (): GetHitPageFailure => ({
  type: constants.FETCH_HIT_PAGE_FAILURE
});
