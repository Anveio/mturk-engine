import { createSelector } from 'reselect';
import {
  RootState,
  HitDatabaseEntry,
  HitDatabaseMap,
  HeatMapValue
} from '../types';
import { generateOneYearOfDates, todayFormatted } from '../utils/dates';

// import { selectedHitDbDateSelector } from './hitDatabaseDay';
import { Map, List } from 'immutable';

export const hitDatabaseSelector = (state: RootState) => state.hitDatabase;

export const pendingEarningsSelector = createSelector(
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

export const hitsCompletedToday = createSelector(
  [ hitDatabaseSelector ],
  (hitDatabase): HitDatabaseMap =>
    hitDatabase.filter(
      (el: HitDatabaseEntry) => el.date === todayFormatted()
    ) as HitDatabaseMap
);

export const todaysProjectedEarnings = createSelector(
  [ hitsCompletedToday ],
  (hits) =>
    hits.reduce(
      (acc: number, cur: HitDatabaseEntry) => acc + cur.bonus + cur.reward,
      0
    )
);
