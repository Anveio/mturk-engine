import { SearchAction } from '../actions/search';
import { SEARCH_FAILURE, SEARCH_REQUEST, SEARCH_SUCCESS } from '../constants';

const initial = false;

export default (state: boolean = initial, action: SearchAction): boolean => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return true;
    case SEARCH_FAILURE:
      return false;
    case SEARCH_SUCCESS:
      return false;
    default:
      return state;
  }
};
