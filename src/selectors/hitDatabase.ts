import { createSelector } from 'reselect';
import {
  RootState,
  HitDatabaseEntry,
  HitDatabaseMap,
  HeatMapValue
} from '../types';
import { todayFormatted, dateRange } from '../utils/dates';
import { Map, List } from 'immutable';

const generateOneYearOfDates = () => {
  const startDate = todayFormatted();
  console.log(startDate);
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
  (hitDatabase): Map<string, number> =>
    hitDatabase.reduce((acc: Map<string, number>, el: HitDatabaseEntry) => {
      return acc.update(
        el.date,
        (reward: number) => (reward ? reward + el.reward : el.reward)
      );
    }, Map<string, number>())
);

// tslint:disable:align
export const oneYearOfData = createSelector(
  [ dateMoneyMap ],
  (moneyEarnedPerDay: Map<string, number>): List<HeatMapValue> => {
    const oneYearOfDates = generateOneYearOfDates();
    return oneYearOfDates.reduce((acc: List<HeatMapValue>, date: string) => {
      const count: number | undefined = moneyEarnedPerDay.get(date);
      const data = count
        ? { date, count: Math.round(count * 100) / 100 }
        : { date, count: 0 };
      // console.log(data);
      return acc.push(data);
    }, List());
  }
);

export const hitsOnSelectedDate = createSelector(
  [ hitDatabaseSelector, selectedHitDbDateSelector ],
  (database: HitDatabaseMap, date: string | null) => {
    return date === null
      ? Map<string, HitDatabaseEntry>()
      : database.filter(
          (entry: HitDatabaseEntry) => entry.date === date
        ) as HitDatabaseMap;
  }
);

export const hitsOnSelectedDateIds = createSelector(
  [ hitsOnSelectedDate ],
  (filteredHits) => filteredHits.map((el: HitDatabaseEntry) => el.id).toList()
);
