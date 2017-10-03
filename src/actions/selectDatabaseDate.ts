import { SELECT_DATABASE_DATE } from '../constants';

export interface SelectDatabaseDate {
  readonly type: SELECT_DATABASE_DATE;
  readonly dateString: string;
}

export const selectDatabaseDate = (dateString: string): SelectDatabaseDate => ({
  type: SELECT_DATABASE_DATE,
  dateString
});
