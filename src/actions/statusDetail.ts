import {
  STATUS_DETAIL_REQUEST,
  STATUS_DETAIL_FAILURE,
  STATUS_DETAIL_SUCCESS
} from '../constants';
import { HitDatabaseMap } from '../types';

export interface FetchStatusDetailRequest {
  readonly type: STATUS_DETAIL_REQUEST;
  readonly dateString: string;
  readonly page: number;
  readonly withToast: boolean;
}

export interface FetchStatusDetailSuccess {
  readonly type: STATUS_DETAIL_SUCCESS;
  readonly data: HitDatabaseMap;
}

export interface FetchStatusDetailFailure {
  readonly type: STATUS_DETAIL_FAILURE;
}

export const statusDetailRequest = (
  dateString: string,
  page = 1,
  withToast = false
): FetchStatusDetailRequest => ({
  type: STATUS_DETAIL_REQUEST,
  dateString,
  page,
  withToast
});

export const statusDetailFailure = (): FetchStatusDetailFailure => ({
  type: STATUS_DETAIL_FAILURE
});

export const statusDetailSuccess = (
  data: HitDatabaseMap
): FetchStatusDetailSuccess => ({
  type: STATUS_DETAIL_SUCCESS,
  data
});
