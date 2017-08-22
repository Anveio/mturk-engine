import { ChangeSorting } from '../actions/sorting';
import { SortingOption } from '../types';
import { CHANGE_SORTING_OPTION } from '../constants';

export default (state: SortingOption = 'Reward', action: ChangeSorting) => {
  switch (action.type) {
    case CHANGE_SORTING_OPTION:
      return action.data;
    default:
      return state;
  }
};
