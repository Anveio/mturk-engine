import { createSelector } from 'reselect';
import {
  RootState,
  HitDatabaseEntry,
  HitDatabaseMap,
  HeatMapValue
} from '../types';
import { shiftDate, dateRange } from '../utils/dates';
import { Map, List } from 'immutable';

const generateOneYearOfDates = () => {
  const startDate = shiftDate(new Date(), -365 + 1);
  return dateRange(startDate);
};

export const hitDatabaseSelector = (state: RootState) => state.hitDatabase;
export const selectedHitDbDateSelector = (state: RootState) =>
  state.selectedHitDbDate;

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

export const hitsOnSelectedDate = createSelector(
  [ hitDatabaseSelector, selectedHitDbDateSelector ],
  (database: HitDatabaseMap, date: Date | null) => {
    return date === null
      ? Map<string, HitDatabaseEntry>()
      : database.filter(
          (entry: HitDatabaseEntry) => entry.date.valueOf() === date.valueOf()
        ) as HitDatabaseMap;
  }
);

export const hitsOnSelectedDateIds = createSelector(
  [ hitsOnSelectedDate ],
  (filteredHits) => filteredHits.map((el: HitDatabaseEntry) => el.id).toList()
);
