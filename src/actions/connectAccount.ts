import {
  CONNECT_ACCOUNT_REQUEST,
  CONNECT_ACCOUNT_SUCCESS,
  CONNECT_ACCOUNT_FAILURE,
  DISCONNECT_ACCOUNT
} from '../constants';
import { AccountInfo } from '../types';

export interface ConnectAccountRequest {
  type: CONNECT_ACCOUNT_REQUEST;
}

export interface ConnectAccountFailure {
  type: CONNECT_ACCOUNT_FAILURE;
}

export interface DisconnectAccount {
  type: DISCONNECT_ACCOUNT;
}

export interface ConnectAccountSuccess {
  type: CONNECT_ACCOUNT_SUCCESS;
  data: AccountInfo;
}

export type ConnectAccountAction =
  | DisconnectAccount
  | ConnectAccountRequest
  | ConnectAccountSuccess;

export const connectAccountRequest = (): ConnectAccountRequest => ({
  type: CONNECT_ACCOUNT_REQUEST
});

export const connectAccountFailure = (): ConnectAccountFailure => ({
  type: CONNECT_ACCOUNT_FAILURE
});

export const connectAccountSuccess = (
  data: AccountInfo
): ConnectAccountSuccess => ({
  type: CONNECT_ACCOUNT_SUCCESS,
  data
});

export const disconnectAccount = (): DisconnectAccount => ({
  type: DISCONNECT_ACCOUNT
});
