import { updateValue } from './updateValue';
import {
  UPDATE_DB_SEARCH_TERM,
  UPDATE_DB_STATUS_FILTERS,
  UPDATE_DB_SORT_ORDER
} from '../constants';
import { StatusFilterType, FilterOrderType } from 'types';

export interface UpdateDatabaseSearchTerm {
  readonly type: UPDATE_DB_SEARCH_TERM;
  readonly data: string;
}

export interface UpdateDatabaseStatusFilters {
  readonly type: UPDATE_DB_STATUS_FILTERS;
  readonly data: StatusFilterType[];
}

export interface UpdateDatabaseSortOrder {
  readonly type: UPDATE_DB_SORT_ORDER;
  readonly data: FilterOrderType;
}

export type DatabaseFilterAction =
  | UpdateDatabaseSearchTerm
  | UpdateDatabaseStatusFilters
  | UpdateDatabaseSortOrder;

export const changeSearchTerm = updateValue<string>(UPDATE_DB_SEARCH_TERM);

export const changeFilterSortOrder = (
  data: FilterOrderType
): UpdateDatabaseSortOrder => ({
  type: UPDATE_DB_SORT_ORDER,
  data
});

export const changeFilters = (
  data: StatusFilterType[]
): UpdateDatabaseStatusFilters => ({
  type: UPDATE_DB_STATUS_FILTERS,
  data
});
