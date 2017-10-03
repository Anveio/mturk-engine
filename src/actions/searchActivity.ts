import { TOGGLE_SEARCH_ACTIVITY } from '../constants';

export interface ToggleSearchActive {
  readonly type: TOGGLE_SEARCH_ACTIVITY;
}

export const toggleSearchActive = (): ToggleSearchActive => ({
  type: TOGGLE_SEARCH_ACTIVITY
});
