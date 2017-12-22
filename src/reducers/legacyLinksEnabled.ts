import { ToggleLegacyLinks } from '../actions/updateValue';
import { TOGGLE_LEGACY_LINKS } from '../constants/index';

export default (state = false, action: ToggleLegacyLinks): boolean => {
  switch (action.type) {
    case TOGGLE_LEGACY_LINKS:
      return !state;
    default:
      return state;
  }
};
