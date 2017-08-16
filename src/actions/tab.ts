import { CHANGE_SELECTED_TAB } from '../constants';

export interface ChangeTab {
  type: CHANGE_SELECTED_TAB;
  data: number;
}

export const changeTab = (data: number): ChangeTab => ({
  type: CHANGE_SELECTED_TAB,
  data
});
