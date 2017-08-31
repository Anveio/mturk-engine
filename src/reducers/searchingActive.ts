import { TOGGLE_SEARCH_ACTIVITY } from '../constants';
import { ToggleSearchActive } from '../actions/scheduler';

const initial = false;

export default (state = initial, action: ToggleSearchActive) => {
  switch (action.type) {
    case TOGGLE_SEARCH_ACTIVITY:
      return !state;
    default:
      return state;
  }
};
