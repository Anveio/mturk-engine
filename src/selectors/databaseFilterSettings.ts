import { hitDatabaseSelector, databaseFilterSettingsSelector } from './index';
import { createSelector } from 'reselect';
import { HitDatabaseEntry, HitDatabaseMap, StatusFilterType } from 'types';
import { filterBy, createFilterFn } from 'utils/databaseFilter';
import { Map } from 'immutable';

export const hitDatabaseFilteredByStatus = createSelector(
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

export const hitDatabaseFilteredBySearchTerm = createSelector(
  [hitDatabaseFilteredByStatus, databaseFilterSettingsSelector],
  (hitDatabase, { searchTerm }) => {
    const searchRegex = new RegExp(searchTerm, 'i');
    const hitMatchesSearchTerm = createFilterFn(searchTerm, searchRegex);

    return hitDatabase
      .filter(hitMatchesSearchTerm)
      .map((el: HitDatabaseEntry) => el.id);
  }
);
