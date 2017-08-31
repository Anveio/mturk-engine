import { TOGGLE_SEARCH_ACTIVITY } from '../constants'

export interface ToggleSearchActive {
  type: TOGGLE_SEARCH_ACTIVITY;
  active: boolean;
}

export const toggleSearchActive = (active: boolean): ToggleSearchActive => ({
  type: TOGGLE_SEARCH_ACTIVITY,
  active
})