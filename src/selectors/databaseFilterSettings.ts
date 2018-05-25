import { hitDatabaseSelector, databaseFilterSettingsSelector } from './index';
import { createSelector } from 'reselect';
import { HitDatabaseMap, StatusFilterType, HitDatabaseEntry } from 'types';
import { filterBy, createFilterFn, createSortFn } from 'utils/databaseFilter';
import { Map } from 'immutable';
import { escapeUserInputForRegex } from 'utils/formatting';
import { rewardAndBonus } from 'utils/hitDatabase';

const hitDatabaseFilteredByStatus = createSelector(
  [hitDatabaseSelector, databaseFilterSettingsSelector],
  (hitDatabase, { statusFilters }) => {
    if (statusFilters.length === 0) {
      return hitDatabase;
    }

    const filterFunction = filterBy(hitDatabase);

    const resultsMaps = statusFilters.reduce(
      (acc: HitDatabaseMap[], cur: StatusFilterType) =>
        acc.concat(filterFunction(cur)),
      []
    );

    return resultsMaps.reduce(
      (acc: HitDatabaseMap, cur: HitDatabaseMap) => acc.merge(cur),
      Map()
    );
  }
);

const hitDatabaseFilteredBySearchTerm = createSelector(
  [hitDatabaseFilteredByStatus, databaseFilterSettingsSelector],
  (hitDatabase, { searchTerm }) => {
    if (searchTerm.length === 0) {
      return hitDatabase;
    }

    const searchRegex = new RegExp(escapeUserInputForRegex(searchTerm), 'i');
    const hitMatchesSearchTerm = createFilterFn(searchTerm, searchRegex);

    return hitDatabase.filter(hitMatchesSearchTerm);
  }
);

const sortedAndFilteredHitDatabase = createSelector(
  [hitDatabaseFilteredBySearchTerm, databaseFilterSettingsSelector],
  (hitDatabase, { sortOrder }) => {
    const sortFn = createSortFn(sortOrder);
    return hitDatabase.sort(sortFn);
  }
);

export const filteredResultsIds = createSelector(
  [sortedAndFilteredHitDatabase],
  hitDatabase => hitDatabase.map((hit: HitDatabaseEntry) => hit.id)
);

export const databaseFilterResultsMoneyTotal = createSelector(
  [sortedAndFilteredHitDatabase],
  hitDatabase =>
    hitDatabase.reduce(
      (acc: number, el: HitDatabaseEntry) => acc + rewardAndBonus(el),
      0
    )
);
