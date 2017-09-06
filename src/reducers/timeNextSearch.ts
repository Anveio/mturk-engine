import { ScheduleAction } from '../actions/scheduler';
import { SCHEDULE_NEXT_SEARCH, CANCEL_NEXT_SEARCH } from '../constants';

export default (
  state: Date | null = null,
  action: ScheduleAction
): Date | null => {
  switch (action.type) {
    case SCHEDULE_NEXT_SEARCH:
      return action.time;
    case CANCEL_NEXT_SEARCH:
      return null;
    default:
      return state;
  }
};
