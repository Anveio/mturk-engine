import { SCHEDULE_NEXT_SEARCH, CANCEL_NEXT_SEARCH } from '../constants';

export interface ScheduleNextSearch {
  readonly type: SCHEDULE_NEXT_SEARCH;
  readonly time: Date;
}

export interface CancelNextSearch {
  readonly type: CANCEL_NEXT_SEARCH;
}

export type ScheduleAction = ScheduleNextSearch | CancelNextSearch;

export const scheduleSearch = (time: Date): ScheduleNextSearch => ({
  type: SCHEDULE_NEXT_SEARCH,
  time
});

export const cancelNextSearch = (): CancelNextSearch => ({
  type: CANCEL_NEXT_SEARCH
});
