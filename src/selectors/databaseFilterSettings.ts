import { hitDatabaseSelector, databaseFilterSettingsSelector } from './index';
import { createSelector } from 'reselect';
import { HitDatabaseMap, StatusFilterType, HitDatabaseEntry } from 'types';
import { filterBy, createFilterFn, createSortFn } from 'utils/databaseFilter';
import { Map } from 'immutable';
import { escapeUserInputForRegex } from 'utils/formatting';

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

const hitDatabaseFilteredWithOptions = createSelector(
  [hitDatabaseFilteredBySearchTerm, databaseFilterSettingsSelector],
  (hitDatabase, { sortOrder }) => {
    const sortFn = createSortFn(sortOrder);
    return hitDatabase.sort(sortFn);
  }
);

export const sortedAndFilteredHitDatabase = createSelector(
  [hitDatabaseFilteredWithOptions],
  hitDatabase => hitDatabase.map((hit: HitDatabaseEntry) => hit.id)
);
