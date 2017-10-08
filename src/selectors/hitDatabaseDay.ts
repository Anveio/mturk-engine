import { RootState, HitDatabaseMap, HitDatabaseEntry } from '../types';
import { createSelector } from 'reselect';
import { hitDatabaseSelector } from './hitDatabase';
import { keepPaidOrApproved, keepPending } from '../utils/hitDatabase';
import { Map } from 'immutable';

export const selectedHitDbDateSelector = (state: RootState) =>
  state.selectedHitDbDate;

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

export const earningsOnDate = createSelector(
  [ hitsOnSelectedDate ],
  (entry: HitDatabaseMap) =>
    entry
      .filter(keepPaidOrApproved)
      .reduce(
        (acc: number, cur: HitDatabaseEntry) =>
          (acc += cur.reward + (cur.bonus || 0)),
        0
      )
);

export const pendingEarningsOnDate = createSelector(
  [ hitsOnSelectedDate ],
  (entry: HitDatabaseMap) =>
    entry
      .filter(keepPending)
      .reduce((acc: number, cur: HitDatabaseEntry) => (acc += cur.reward), 0)
);
