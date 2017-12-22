import {
  REFRESH_DATABASE_REQUEST,
  REFRESH_DATABASE_SUCCESS,
  REFRESH_DATABASE_FAILURE
} from '../constants';

export interface RefreshDatabaseRequest {
  readonly type: REFRESH_DATABASE_REQUEST;
  readonly workedDates: Date[];
}

export interface RefreshDatabaseSuccess {
  readonly type: REFRESH_DATABASE_SUCCESS;
}

export interface RefreshDatabaseFailure {
  readonly type: REFRESH_DATABASE_FAILURE;
  readonly errors: string[];
}

export type RefreshDatabaseAction =
  | RefreshDatabaseRequest
  | RefreshDatabaseSuccess
  | RefreshDatabaseFailure;

export const databaseRefreshRequest = (
  workedDates: Date[]
): RefreshDatabaseRequest => ({
  type: REFRESH_DATABASE_REQUEST,
  workedDates
});

export const databaseRefreshSuccess = (): RefreshDatabaseSuccess => ({
  type: REFRESH_DATABASE_SUCCESS
});

export const databaseRefreshFailure = (
  errors: string[]
): RefreshDatabaseFailure => ({
  type: REFRESH_DATABASE_FAILURE,
  errors
});
