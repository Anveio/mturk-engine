import { CHANGE_SORTING_OPTION } from '../constants';
import { SortingOption } from '../types';

export interface ChangeSorting {
  readonly type: CHANGE_SORTING_OPTION;
  readonly data: SortingOption;
}

export const changeSorting = (data: SortingOption): ChangeSorting => ({
  type: CHANGE_SORTING_OPTION,
  data
});
