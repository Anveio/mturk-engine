import { ScheduleAction } from '../actions/scheduler';
import { SCHEDULE_NEXT_SEARCH } from '../constants';

export default (
  state: Date | null = null,
  action: ScheduleAction
): Date | null => {
  switch (action.type) {
    case SCHEDULE_NEXT_SEARCH:
      return action.time;
    default:
      return state;
  }
};
