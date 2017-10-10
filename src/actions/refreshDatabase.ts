import {
  REFRESH_DATABASE_REQUEST,
  REFRESH_DATABASE_SUCCESS,
  REFRESH_DATABASE_FAILURE
} from '../constants';

export interface RefreshDatabaseRequest {
  readonly type: REFRESH_DATABASE_REQUEST;
  readonly dateStrings: string[];
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
  dateStrings: string[]
): RefreshDatabaseRequest => ({
  type: REFRESH_DATABASE_REQUEST,
  dateStrings
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
