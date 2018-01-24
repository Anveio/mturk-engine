import { ScheduleAction } from '../actions/scheduler';
import {
  SCHEDULE_NEXT_SEARCH,
  CANCEL_NEXT_SEARCH,
  SEARCH_FAILURE
} from '../constants';
import { SearchFailure } from '../actions/search';

export default (
  state: Date | null = null,
  action: ScheduleAction | SearchFailure
): Date | null => {
  switch (action.type) {
    case SCHEDULE_NEXT_SEARCH:
      return action.time;
    case SEARCH_FAILURE:
    case CANCEL_NEXT_SEARCH:
      return null;
    default:
      return state;
  }
};
