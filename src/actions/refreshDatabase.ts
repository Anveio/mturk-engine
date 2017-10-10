import {
  REFRESH_DATABASE_SUCCESS,
  REFRESH_DATABASE_FAILURE
} from '../constants';

export interface RefreshDatabaseSuccess {
  type: REFRESH_DATABASE_SUCCESS;
}

export interface RefreshDatabaseFailure {
  type: REFRESH_DATABASE_FAILURE;
  errors: string[];
}

export const databaseRefreshSuccess = (): RefreshDatabaseSuccess => ({
  type: REFRESH_DATABASE_SUCCESS
});

export const databaseRefreshFailure = (
  errors: string[]
): RefreshDatabaseFailure => ({
  type: REFRESH_DATABASE_FAILURE,
  errors
});
