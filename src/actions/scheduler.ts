import { SCHEDULE_NEXT_SEARCH } from '../constants';

export interface ScheduleNextSearch {
  type: SCHEDULE_NEXT_SEARCH;
  time: Date;
}

export type ScheduleAction = ScheduleNextSearch;

export const scheduleSearch = (time: Date): ScheduleNextSearch => ({
  type: SCHEDULE_NEXT_SEARCH,
  time
});
