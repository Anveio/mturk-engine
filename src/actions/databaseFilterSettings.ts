import { updateValue } from './updateValue';
import { UPDATE_DB_SEARCH_TERM } from '../constants';

export interface UpdateDatabaseSearchTerm {
  readonly type: UPDATE_DB_SEARCH_TERM;
  readonly data: string;
}

export const changeSearchTerm = updateValue<string>(UPDATE_DB_SEARCH_TERM);
