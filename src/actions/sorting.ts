import { CHANGE_SORTING_OPTION } from '../constants';
import { SortingOption } from '../types';

export interface ChangeSorting {
  type: CHANGE_SORTING_OPTION;
  data: SortingOption;
}

export const changeSorting = (data: SortingOption): ChangeSorting => ({
  type: CHANGE_SORTING_OPTION,
  data
});
