import { updateValue } from './updateValue';
import { UPDATE_DB_SEARCH_TERM, UPDATE_DB_STATUS_FILTERS } from '../constants';
import { StatusFilterType } from 'types';
import { Set } from 'immutable';

export interface UpdateDatabaseSearchTerm {
  readonly type: UPDATE_DB_SEARCH_TERM;
  readonly data: string;
}

export interface UpdateDatabaseStatusFilters {
  readonly type: UPDATE_DB_STATUS_FILTERS;
  readonly data: Set<StatusFilterType>;
}

export type DatabaseFilterAction =
  | UpdateDatabaseSearchTerm
  | UpdateDatabaseStatusFilters;

export const changeSearchTerm = updateValue<string>(UPDATE_DB_SEARCH_TERM);

export const changeFilters = (
  data: Set<StatusFilterType>
): UpdateDatabaseStatusFilters => ({
  type: UPDATE_DB_STATUS_FILTERS,
  data
});
