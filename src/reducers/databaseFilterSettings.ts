import { UPDATE_DB_SEARCH_TERM } from '../constants';
import { DatabaseFilterSettings } from 'types';
import { UpdateDatabaseSearchTerm } from 'actions/databaseFilterSettings';

const initial: DatabaseFilterSettings = {
  searchTerm: ''
};

export default (
  state = initial,
  action: UpdateDatabaseSearchTerm
): DatabaseFilterSettings => {
  switch (action.type) {
    case UPDATE_DB_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.data
      };
    default:
      return state;
  }
};
