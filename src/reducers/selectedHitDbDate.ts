import { DatabaseDateSelectionAction } from '../actions/selectDatabaseDate';
import { SELECT_DATABASE_DATE, CLEAR_DATABASE_DATE_SELECT } from '../constants';

export default (
  state: string | null = null,
  action: DatabaseDateSelectionAction
) => {
  switch (action.type) {
    case SELECT_DATABASE_DATE:
      return action.dateString;
    case CLEAR_DATABASE_DATE_SELECT:
      return null;
    default:
      return state;
  }
};
