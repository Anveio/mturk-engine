import {
  RootState,
  HitDatabaseMap,
  HitDatabaseEntry,
  DailyEarnings
} from '../types';
import { createSelector } from 'reselect';
import { hitDatabaseSelector } from './hitDatabase';
import { isPaidOrApproved, isPending } from '../utils/hitDatabase';
import { Map } from 'immutable';

// tslint:disable:align

export const selectedHitDbDateSelector = (state: RootState) =>
  state.selectedHitDbDate;

export const hitsOnSelectedDate = createSelector(
  [hitDatabaseSelector, selectedHitDbDateSelector],
  (database: HitDatabaseMap, date: string | null) => {
    return date === null
      ? Map<string, HitDatabaseEntry>()
      : database.filter(
          (entry: HitDatabaseEntry) => entry.date === date
        ) as HitDatabaseMap;
  }
);

export const hitsOnSelectedDateSortedByPay = createSelector(
  [hitsOnSelectedDate],
  hits => hits.sort((a: HitDatabaseEntry, b) => b.reward - a.reward)
);

export const pendingResultsOnSelectedDate = createSelector(
  [hitsOnSelectedDateSortedByPay],
  hits =>
    hits.filter((el: HitDatabaseEntry) => el.status === 'Pending Approval')
);

export const nonPendingResultsOnSelectedDate = createSelector(
  [hitsOnSelectedDateSortedByPay],
  hits =>
    hits.filter((el: HitDatabaseEntry) => el.status !== 'Pending Approval')
);

export const groupPendingHitsBeforeNonPending = createSelector(
  [pendingResultsOnSelectedDate, nonPendingResultsOnSelectedDate],
  (pending: HitDatabaseMap, nonPending: HitDatabaseMap) =>
    pending.concat(nonPending)
);

export const hitsOnSelectedDateIds = createSelector(
  [groupPendingHitsBeforeNonPending],
  groupedAndSortedResults =>
    groupedAndSortedResults.map((el: HitDatabaseEntry) => el.id).toList()
);

export const earningsOnDate = createSelector(
  [hitsOnSelectedDate],
  (entry: HitDatabaseMap) =>
    entry.filter(isPaidOrApproved).reduce((
      acc: DailyEarnings,
      cur: HitDatabaseEntry
    ) => ({
      reward: acc.reward + cur.reward,
      bonus: acc.bonus + cur.bonus || 0
    }),
    {
      reward: 0,
      bonus: 0
    })
);

export const pendingEarningsOnDate = createSelector(
  [hitsOnSelectedDate],
  (entry: HitDatabaseMap) =>
    entry
      .filter(isPending)
      .reduce((acc: number, cur: HitDatabaseEntry) => (acc += cur.reward), 0)
);
