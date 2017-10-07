import {
  CHANGE_DAILY_GOAL,
  CHANGE_SELECTED_TAB,
  TOGGLE_SEARCH_ACTIVITY
} from '../constants';

export interface ChangeTab {
  readonly type: CHANGE_SELECTED_TAB;
  readonly data: number;
}

export interface ChangeDailyGoal {
  readonly type: CHANGE_DAILY_GOAL;
  readonly data: number;
}

export interface ToggleSearchActive {
  readonly type: TOGGLE_SEARCH_ACTIVITY;
}

type Primitive = string | number | boolean;

export const updateValue = <T extends Primitive>(type: string) => (
  data: T
) => ({
  type,
  data
});

export const toggleValue = (type: string) => () => ({ type });

export const changeDailyGoal = updateValue<number>(CHANGE_DAILY_GOAL);
export const changeTab = updateValue<number>(CHANGE_SELECTED_TAB);
export const toggleSearchActive = toggleValue(TOGGLE_SEARCH_ACTIVITY);
