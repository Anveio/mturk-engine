import {
  STATUS_DETAIL_REQUEST,
  STATUS_DETAIL_FAILURE,
  STATUS_DETAIL_SUCCESS
} from '../constants';
import { HitDatabaseMap } from '../types';
import { LEGACY_DATE_FORMAT, WORKER_DATE_FORMAT } from '../constants/misc';

export interface FetchStatusDetailRequest {
  readonly type: STATUS_DETAIL_REQUEST;
  readonly dateString: string;
  readonly dateFormat: LEGACY_DATE_FORMAT | WORKER_DATE_FORMAT;
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
  dateFormat: LEGACY_DATE_FORMAT | WORKER_DATE_FORMAT,
  page = 1,
  withToast = false
): FetchStatusDetailRequest => ({
  type: STATUS_DETAIL_REQUEST,
  dateString,
  dateFormat,
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
