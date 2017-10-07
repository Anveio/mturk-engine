import { ChangeDailyGoal } from '../actions/updateValue';
import { CHANGE_DAILY_GOAL } from '../constants';

export default (state = 5, action: ChangeDailyGoal): number => {
  switch (action.type) {
    case CHANGE_DAILY_GOAL:
      return action.data;
    default:
      return state;
  }
};
