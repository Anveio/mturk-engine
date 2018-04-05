import { ChangeSearchResultSort } from '../actions/sorting';
import { SortingOption } from '../types';
import { CHANGE_SEARCH_RESULT_SORT } from '../constants';

export default (state: SortingOption = 'Latest', action: ChangeSearchResultSort) => {
  switch (action.type) {
    case CHANGE_SEARCH_RESULT_SORT:
      return action.data;
    default:
      return state;
  }
};
