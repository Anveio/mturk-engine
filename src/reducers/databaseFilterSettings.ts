import {
  UPDATE_DB_SEARCH_TERM,
  UPDATE_DB_STATUS_FILTERS,
  UPDATE_DB_SORT_ORDER
} from '../constants';
import { DatabaseFilterSettings } from 'types';
import { DatabaseFilterAction } from 'actions/databaseFilterSettings';

const initial: DatabaseFilterSettings = {
  searchTerm: '',
  statusFilters: [],
  sortOrder: 'DATE_RECENT_FIRST'
};

export default (
  state = initial,
  action: DatabaseFilterAction
): DatabaseFilterSettings => {
  switch (action.type) {
    case UPDATE_DB_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.data
      };
    case UPDATE_DB_STATUS_FILTERS:
      return {
        ...state,
        statusFilters: action.data
      };
    case UPDATE_DB_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.data
      };
    default:
      return state;
  }
};
