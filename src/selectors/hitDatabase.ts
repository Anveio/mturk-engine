import { createSelector } from 'reselect';
import {
  RootState,
  HitDatabaseEntry,
  HitDatabaseMap,
  HeatMapValue,
  RequesterMap,
  Requester
} from '../types';
import {
  generateOneYearOfDates,
  todayFormatted,
  stringToDate
} from '../utils/dates';
import {
  rewardAndBonus,
  isPending,
  isApprovedButNotPaid
} from '../utils/hitDatabase';

// import { selectedHitDbDateSelector } from './hitDatabaseDay';
import { Map, List } from 'immutable';
import { LEGACY_DATE_FORMAT } from '../constants/misc';

export const hitDatabaseSelector = (state: RootState) => state.hitDatabase;

export const pendingEarningsSelector = createSelector(
  [hitDatabaseSelector],
  hitDatabase =>
    hitDatabase.reduce(
      (acc: number, hit: HitDatabaseEntry) =>
        isPending(hit) ? acc + hit.reward : acc,
      0
    )
);

export const approvedButNotPaidEarnings = createSelector(
  [hitDatabaseSelector],
  hitDatabase =>
    hitDatabase.reduce(
      (acc: number, hit: HitDatabaseEntry) =>
        isApprovedButNotPaid(hit) ? acc + hit.reward : acc,
      0
    )
);

// tslint:disable:align
export const dateMoneyMap = createSelector(
  [hitDatabaseSelector],
  (hitDatabase): Map<string, number> =>
    hitDatabase.reduce(
      (acc: Map<string, number>, el: HitDatabaseEntry) =>
        acc.update(
          el.date,
          (reward: number) =>
            reward ? reward + rewardAndBonus(el) : rewardAndBonus(el)
        ),
      Map<string, number>()
    )
);

// tslint:disable:align
export const oneYearOfData = createSelector(
  [dateMoneyMap],
  (moneyEarnedPerDay: Map<string, number>): List<HeatMapValue> => {
    const oneYearOfDates = generateOneYearOfDates();
    return oneYearOfDates.reduce((acc: List<HeatMapValue>, date: string) => {
      const count: number | undefined = moneyEarnedPerDay.get(date);
      const data = count
        ? { date, count: Math.round(count * 100) / 100 }
        : { date, count: 0 };
      return acc.push(data);
    }, List());
  }
);

export const hitsCompletedToday = createSelector(
  [hitDatabaseSelector],
  (hitDatabase): HitDatabaseMap => {
    const todaysDateString = todayFormatted();
    return hitDatabase.filter(
      (el: HitDatabaseEntry) => el.date === todaysDateString
    ) as HitDatabaseMap;
  }
);

export const todaysProjectedEarnings = createSelector(
  [hitsCompletedToday],
  hits =>
    hits.reduce(
      (acc: number, cur: HitDatabaseEntry) => acc + rewardAndBonus(cur),
      0
    )
);

export const hitDatabaseToRequesterMap = createSelector(
  [hitDatabaseSelector],
  database =>
    database.reduce(
      (acc: RequesterMap, cur: HitDatabaseEntry): RequesterMap =>
        acc.set(cur.requester.id, cur.requester),
      Map<string, Requester>()
    )
);

export const hitDatabaseToRequesterWorkHistoryMap = createSelector(
  [hitDatabaseSelector],
  database =>
    database.reduce(
      (acc: Map<string, List<HitDatabaseEntry>>, cur: HitDatabaseEntry) =>
        acc.update(
          cur.requester.id,
          (submittedHits: List<HitDatabaseEntry>) =>
            submittedHits ? submittedHits.push(cur) : List([cur])
        ),
      Map<string, List<HitDatabaseEntry>>()
    )
);

export const getAllHitsSubmittedToRequester = (requesterId: string) =>
  createSelector([hitDatabaseToRequesterWorkHistoryMap], workHistory =>
    workHistory.get(requesterId, List([]))
  );

export const allHitsSubmittedToRequesterRecentFirst = (requesterId: string) =>
  createSelector(
    [getAllHitsSubmittedToRequester(requesterId)],
    hits =>
      hits.sort(
        (a, b) =>
          stringToDate(b.date)(LEGACY_DATE_FORMAT).valueOf() -
          stringToDate(a.date)(LEGACY_DATE_FORMAT).valueOf()
      ) as List<HitDatabaseEntry>
  );
