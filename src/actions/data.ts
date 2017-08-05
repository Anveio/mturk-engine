import * as constants from '../constants';

export interface GetHitPageSuccess {
  type: constants.GET_HIT_PAGE_SUCCESS;
  data: HitTableEntry[];
}

export interface GetHitPageFailure {
  type: constants.GET_HIT_PAGE_FAILURE;
}

export type HitPageAction = GetHitPageSuccess | GetHitPageFailure;

export const getHitPageSuccess = (data: HitTableEntry[]): GetHitPageSuccess => ({
  type: constants.GET_HIT_PAGE_SUCCESS,
  data
});

export const getHitPageFailure = (): GetHitPageFailure => ({
  type: constants.GET_HIT_PAGE_FAILURE
});
