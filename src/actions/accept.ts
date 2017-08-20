import { ACCEPT_HIT_SUCCESS } from '../constants';

export interface AcceptHitSuccess {
  type: ACCEPT_HIT_SUCCESS;
}

export type AcceptAction = AcceptHitSuccess;

export const acceptHitSuccess = (): AcceptHitSuccess => ({
  type: ACCEPT_HIT_SUCCESS
});
