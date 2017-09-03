import { SearchSuccess } from '../actions/search';
import { SEARCH_SUCCESS } from '../constants';

export default (state: Date | null = null, action: SearchSuccess) => {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return new Date();
    default:
      return state;
  }
};
