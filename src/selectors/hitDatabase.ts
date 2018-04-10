import { createSelector } from 'reselect';
import {
  HitDatabaseEntry,
  HitDatabaseMap,
  HeatMapValue,
  RequesterMap,
  Requester,
  HitId,
  RequesterId,
  LegacyDateFormat
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
import { Map, List } from 'immutable';
import { hitDatabaseSelector } from './index';
import { LEGACY_DATE_FORMAT } from 'constants/misc';

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
  (hitDatabase): Map<HitId, number> =>
    hitDatabase.reduce(
      (acc: Map<LegacyDateFormat, number>, el: HitDatabaseEntry) =>
        acc.update(
          el.date,
          (reward: number) =>
            reward ? reward + rewardAndBonus(el) : rewardAndBonus(el)
        ),
      Map<LegacyDateFormat, number>()
    )
);

// tslint:disable:align
export const oneYearOfData = createSelector(
  [dateMoneyMap],
  (moneyEarnedPerDay: Map<LegacyDateFormat, number>): List<HeatMapValue> => {
    const oneYearOfDates = generateOneYearOfDates();
    return oneYearOfDates.reduce(
      (acc: List<HeatMapValue>, date: LegacyDateFormat) => {
        const count: number | undefined = moneyEarnedPerDay.get(date);
        const data = count
          ? { date, count: Math.round(count * 100) / 100 }
          : { date, count: 0 };
        return acc.push(data);
      },
      List()
    );
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
      Map<RequesterId, Requester>()
    )
);

export const hitDatabaseToRequesterWorkHistoryMap = createSelector(
  [hitDatabaseSelector],
  database =>
    database.reduce(
      (acc: Map<RequesterId, List<HitDatabaseEntry>>, cur: HitDatabaseEntry) =>
        acc.update(
          cur.requester.id,
          (submittedHits: List<HitDatabaseEntry>) =>
            submittedHits ? submittedHits.push(cur) : List([cur])
        ),
      Map<RequesterId, List<HitDatabaseEntry>>()
    )
);

const getAllHitsSubmittedToRequester = (requesterId: string) =>
  createSelector([hitDatabaseToRequesterWorkHistoryMap], workHistory =>
    workHistory.get(requesterId, List([]))
  );

export const numPreviouslySubmittedHitsToRequester = (requesterId: string) =>
  createSelector(
    [getAllHitsSubmittedToRequester(requesterId)],
    hits => hits.size
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
