import { ACCEPT_HIT_SUCCESS, ACCEPT_HIT_FAILURE } from '../constants';

export interface AcceptHitSuccess {
  type: ACCEPT_HIT_SUCCESS;
}
export interface AcceptHitFailure {
  type: ACCEPT_HIT_FAILURE;
}

export type AcceptAction = AcceptHitSuccess | AcceptHitFailure;

export const acceptHitSuccess = (): AcceptHitSuccess => ({
  type: ACCEPT_HIT_SUCCESS
});

export const acceptHitFailure = (): AcceptHitFailure => ({
  type: ACCEPT_HIT_FAILURE
});
