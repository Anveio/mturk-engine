import { SELECT_DATABASE_DATE } from '../constants';

export interface SelectDatabaseDate {
  readonly type: SELECT_DATABASE_DATE;
  readonly date: Date;
}

export const selectDatabaseDate = (date: Date): SelectDatabaseDate => ({
  type: SELECT_DATABASE_DATE,
  date
});
