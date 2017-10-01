import { createSelector } from 'reselect';
import { RootState, HitDatabaseEntry, HeatMapValue } from '../types';
import { Map } from 'immutable';

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

export const dateMoneyMap = createSelector(
  [ hitDatabaseSelector ],
  (hitDatabase) =>
    hitDatabase.reduce(
      (acc: Map<Date, number>, el: HitDatabaseEntry) =>
        acc.update(
          el.date,
          (reward: number) => (reward ? reward + el.reward : el.reward)
        ),
      Map<Date, number>()
    )
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
