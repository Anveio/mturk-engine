import { CHANGE_SEARCH_RESULT_SORT } from '../constants';
import { SortingOption } from '../types';

export interface ChangeSearchResultSort {
  readonly type: CHANGE_SEARCH_RESULT_SORT;
  readonly data: SortingOption;
}

export const changeSorting = (data: SortingOption): ChangeSearchResultSort => ({
  type: CHANGE_SEARCH_RESULT_SORT,
  data
});
