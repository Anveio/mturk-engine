import { SelectDatabaseDate } from '../actions/selectDatabaseDate';
import { SELECT_DATABASE_DATE } from '../constants';

export default (state = null, action: SelectDatabaseDate) => {
  switch (action.type) {
    case SELECT_DATABASE_DATE:
      return action.date;
    default:
      return state;
  }
};
