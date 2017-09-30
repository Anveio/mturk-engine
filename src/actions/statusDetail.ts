import {
  STATUS_DETAIL_REQUEST,
  STATUS_DETAIL_FAILURE,
  STATUS_DETAIL_SUCCESS
} from '../constants';
import { HitDatabaseMap } from '../types';

export interface FetchStatusDetailRequest {
  readonly type: STATUS_DETAIL_REQUEST;
  readonly date: Date;
  readonly page: number;
}

export interface FetchStatusDetailSuccess {
  readonly type: STATUS_DETAIL_SUCCESS;
  readonly data: HitDatabaseMap;
}

export interface FetchStatusDetailFailure {
  readonly type: STATUS_DETAIL_FAILURE;
}

export const statusDetailRequest = (
  date: Date,
  page: number = 1
): FetchStatusDetailRequest => ({
  type: STATUS_DETAIL_REQUEST,
  date,
  page
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
