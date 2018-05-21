import { UPDATE_DB_SEARCH_TERM, UPDATE_DB_STATUS_FILTERS } from '../constants';
import { DatabaseFilterSettings, StatusFilterType } from 'types';
import { DatabaseFilterAction } from 'actions/databaseFilterSettings';
import { Set } from 'immutable';

const initial: DatabaseFilterSettings = {
  searchTerm: '',
  statusFilters: Set<StatusFilterType>([])
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
    default:
      return state;
  }
};
