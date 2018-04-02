// tslint:disable:align
import {
  HitDatabaseMap,
  HitDatabaseEntry,
  DailyEarnings,
  HitId,
  LegacyDateFormat
} from '../types';
import { createSelector } from 'reselect';
import { isPaidOrApproved, isPending } from '../utils/hitDatabase';
import { Map } from 'immutable';
import { selectedHitDbDateSelector, hitDatabaseSelector } from './index';

export const hitsOnSelectedDate = createSelector(
  [hitDatabaseSelector, selectedHitDbDateSelector],
  (database: HitDatabaseMap, date: LegacyDateFormat | null) => {
    return date === null
      ? Map<HitId, HitDatabaseEntry>()
      : (database.filter(
          (entry: HitDatabaseEntry) => entry.date === date
        ) as HitDatabaseMap);
  }
);

export const hitsOnSelectedDateSortedByPay = createSelector(
  [hitsOnSelectedDate],
  hits => hits.sort((a: HitDatabaseEntry, b) => b.reward - a.reward)
);

export const pendingResultsOnSelectedDate = createSelector(
  [hitsOnSelectedDateSortedByPay],
  hits =>
    hits.filter(
      (el: HitDatabaseEntry) =>
        el.status === 'Pending Approval' || el.status === 'Submitted'
    )
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
    entry.filter(isPaidOrApproved).reduce(
      (acc: DailyEarnings, cur: HitDatabaseEntry) => ({
        reward: acc.reward + cur.reward,
        bonus: acc.bonus + cur.bonus || 0
      }),
      {
        reward: 0,
        bonus: 0
      }
    )
);

export const pendingEarningsOnDate = createSelector(
  [hitsOnSelectedDate],
  (entry: HitDatabaseMap) =>
    entry
      .filter(isPending)
      .reduce((acc: number, cur: HitDatabaseEntry) => (acc += cur.reward), 0)
);
