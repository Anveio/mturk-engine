import { ScheduleState } from '../types';
import { SCHEDULE_NEXT_SEARCH, CANCEL_NEXT_SEARCH } from '../constants';
import { ScheduleAction } from '../actions/scheduler';

const initial: ScheduleState = {
  nextSearch: null,
  lastSearch: null
};

export default (state = initial, action: ScheduleAction) => {
  let partialState: Partial<ScheduleState> | undefined;

  switch (action.type) {
    case SCHEDULE_NEXT_SEARCH:
      partialState = { nextSearch: action.time };
      break;
    case CANCEL_NEXT_SEARCH:
      partialState = { nextSearch: null };
      break;
    default:
      return state;
  }

  return { ...state, ...partialState };
};
