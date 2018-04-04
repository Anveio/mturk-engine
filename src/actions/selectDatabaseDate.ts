import { SELECT_DATABASE_DATE, CLEAR_DATABASE_DATE_SELECT } from '../constants';
import { LegacyDateFormat } from 'types';

export interface SelectDatabaseDate {
  readonly type: SELECT_DATABASE_DATE;
  readonly dateString: LegacyDateFormat;
}

export interface ClearDatabaseSelection {
  readonly type: CLEAR_DATABASE_DATE_SELECT;
}

export type DatabaseDateSelectionAction =
  | ClearDatabaseSelection
  | SelectDatabaseDate;

export const selectDatabaseDate = (
  dateString: LegacyDateFormat
): SelectDatabaseDate => ({
  type: SELECT_DATABASE_DATE,
  dateString
});

export const clearDatabaseDateSelection = (): ClearDatabaseSelection => ({
  type: CLEAR_DATABASE_DATE_SELECT
});
