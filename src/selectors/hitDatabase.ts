import { createSelector } from 'reselect';
import { RootState, HitDatabaseEntry, HeatMapValue } from '../types';
import { shiftDate, dateRange } from '../utils/dates';
import { Map, List } from 'immutable';

const generateOneYearOfDates = () => {
  const startDate = shiftDate(new Date(), -365 + 1);
  console.log(startDate);
  return dateRange(startDate);
};

export const hitDatabaseSelector = (state: RootState) => state.hitDatabase;

export const pendingEarnings = createSelector(
  [ hitDatabaseSelector ],
  (hitDatabase) =>
    hitDatabase.reduce(
      (acc: number, hit: HitDatabaseEntry) =>
        hit.status === 'Pending' ? acc + hit.reward : acc,
      0
    )
);

// tslint:disable:align
export const dateMoneyMap = createSelector(
  [ hitDatabaseSelector ],
  (hitDatabase): Map<Date, number> =>
    hitDatabase.reduce((acc: Map<Date, number>, el: HitDatabaseEntry) => {
      return acc.update(
        el.date,
        (reward: number) => (reward ? reward + el.reward : el.reward)
      );
    }, Map<Date, number>())
);

// tslint:disable:align
export const oneYearOfData = createSelector(
  [ dateMoneyMap, generateOneYearOfDates ],
  (
    moneyEarnedPerDay: Map<Date, number>,
    oneYearOfDates
  ): List<HeatMapValue> => {
    return oneYearOfDates.reduce((acc: List<HeatMapValue>, date: Date) => {
      const count: number | undefined = moneyEarnedPerDay.get(date);
      const data = count
        ? { date, count: Math.round(count * 100) / 100 }
        : { date, count: 0 };
      // console.log(data);
      return acc.push(data);
    }, List());
  }
);

export const formatForCalendar = createSelector(
  [ dateMoneyMap ],
  (moneyEarnedPerDay: Map<Date, number>) =>
    moneyEarnedPerDay
      .map((reward: number, date: Date): HeatMapValue => ({
        date,
        count: Math.round(reward * 100) / 100
      }))
      .toArray()
);
