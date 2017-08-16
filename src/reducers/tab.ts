import { ChangeTab } from '../actions/tab';
import { CHANGE_SELECTED_TAB } from '../constants';

export default (state = 0, action: ChangeTab) => {
  switch (action.type) {
    case CHANGE_SELECTED_TAB:
      return action.data;
    default:
      return state;
  }
};
