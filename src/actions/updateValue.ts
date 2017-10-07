import { CHANGE_DAILY_GOAL } from '../constants';

export interface ChangeDailyGoal {
  readonly type: CHANGE_DAILY_GOAL;
  readonly data: number;
}

export const updateValue = <T extends string | number>(type: string) => (
  data: T
) => ({
  type,
  data
});

export const changeDailyGoal = updateValue<number>(CHANGE_DAILY_GOAL);
