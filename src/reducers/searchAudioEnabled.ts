import { TOGGLE_SEARCH_AUDIO } from '../constants';
import { ToggleSearchAudio } from '../actions/updateValue';

export default (state = false, action: ToggleSearchAudio) => {
  switch (action.type) {
    case TOGGLE_SEARCH_AUDIO:
      return !state;
    default:
      return state;
  }
};
