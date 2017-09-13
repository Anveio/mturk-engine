import { TOpticonSettings } from '../types';
import { FormUpdate } from '../actions/form';
import { UPDATE_FIELD } from '../constants';

const initial: TOpticonSettings = {
  hideNoToEnabled: false,
  hideBelowThresholdEnabled: false,
  minimumWeightedTO: 2.0,
  commWeight: 1.0,
  fairWeight: 3.0,
  payWeight: 3.0,
  fastWeight: 1.0
};

export default (
  state = initial,
  action: FormUpdate<TOpticonSettings>
): TOpticonSettings => {
  switch (action.type) {
    case UPDATE_FIELD:
      if (action.form === 'topticonSettings') {
        return {
          ...state,
          [action.field]: action.value
        };
      }
      break;
    default:
      return state;
  }

  return state;
};
