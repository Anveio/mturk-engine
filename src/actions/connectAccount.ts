import { CONNECT_ACCOUNT_REQUEST, CONNECT_ACCOUNT_SUCCESS } from '../constants';
import { AccountInfo } from '../types';

export interface ConnectAccountRequest {
  type: CONNECT_ACCOUNT_REQUEST;
}

export interface ConnectAccountSuccess {
  type: CONNECT_ACCOUNT_SUCCESS;
  data: AccountInfo;
}

export type ConnectAccountAction =
  | ConnectAccountRequest
  | ConnectAccountSuccess;

export const connectAccountRequest = (): ConnectAccountRequest => ({
  type: CONNECT_ACCOUNT_REQUEST
});

export const connectAccountSuccess = (
  data: AccountInfo
): ConnectAccountSuccess => ({
  type: CONNECT_ACCOUNT_SUCCESS,
  data
});
