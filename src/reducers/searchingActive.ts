import { TOGGLE_SEARCH_ACTIVITY, SEARCH_FAILURE } from '../constants';
import { ToggleSearchActive } from '../actions/updateValue';
import { SearchFailure } from '../actions/search';

const initial = false;

export default (
  state = initial,
  action: ToggleSearchActive | SearchFailure
) => {
  switch (action.type) {
    case TOGGLE_SEARCH_ACTIVITY:
      return !state;
    case SEARCH_FAILURE:
      return false;
    default:
      return state;
  }
};
