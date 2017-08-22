import { FormToggle } from '../actions/form';
import { TOGGLE_FORM } from '../constants';
const initial: boolean = false;

export default (state = initial, action: FormToggle): boolean => {
  switch (action.type) {
    case TOGGLE_FORM:
      return !state;
    default:
      return state;
  }
};
