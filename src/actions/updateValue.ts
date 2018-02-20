import {
  CHANGE_DAILY_GOAL,
  CHANGE_SELECTED_TAB,
  TOGGLE_SEARCH_ACTIVITY,
  TOGGLE_LEGACY_LINKS
} from '../constants';
import { Primitive } from '../types';

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

export interface ToggleLegacyLinks {
  readonly type: TOGGLE_LEGACY_LINKS;
}

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
export const toggleLegacyLinks = toggleValue(TOGGLE_LEGACY_LINKS);
