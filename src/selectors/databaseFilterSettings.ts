import { hitDatabaseSelector, databaseFIlterSettingsSelector } from './index';
import { createSelector } from 'reselect';
import { HitDatabaseEntry } from 'types';

export const hitDatabaseFilteredBySearchTerm = createSelector(
  [hitDatabaseSelector, databaseFIlterSettingsSelector],
  (hitDatabase, { searchTerm }) =>
    hitDatabase
      .filter((hit: HitDatabaseEntry) => hit.title.search(searchTerm) !== -1)
      .map((el: HitDatabaseEntry) => el.id)
);
