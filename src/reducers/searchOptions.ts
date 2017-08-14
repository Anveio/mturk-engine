import { SearchOptions } from '../types';
import { FormUpdate } from '../actions/searchOptions';
import { UPDATE_FIELD } from '../constants';

const initial: SearchOptions = {
  delay: '10',
  minReward: '0',
  sortType: 'Latest',
  qualified: true
};

export default (state = initial, action: FormUpdate): SearchOptions => {
  let partialState: SearchOptions | undefined;

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
