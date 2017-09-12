import { TOpticonSettings } from '../types';
import { FormUpdate } from '../actions/form';
import { UPDATE_FIELD } from '../constants';

const initial: TOpticonSettings = {
  hideBelowThresholdEnabled: false,
  minimumWeightedTO: 2.0,
  commWeight: 1.0,
  fairWeight: 3.0,
  payWeight: 3.0,
  fastWeight: 1.0
};

export default (state = initial, action: FormUpdate): TOpticonSettings => {
  let partialState: TOpticonSettings | undefined;

  switch (action.type) {
    case UPDATE_FIELD:
      partialState = {
        ...state,
        [action.field]: action.value
      };
      break;
    default:
      return state;
  }
  return { ...state, ...partialState };
};
