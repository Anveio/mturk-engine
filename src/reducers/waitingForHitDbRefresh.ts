import { RefreshDatabaseAction } from '../actions/refreshDatabase';
import {
  REFRESH_DATABASE_REQUEST,
  REFRESH_DATABASE_SUCCESS,
  REFRESH_DATABASE_FAILURE
} from '../constants';

const initial = false;

export default (
  state: boolean = initial,
  action: RefreshDatabaseAction
): boolean => {
  switch (action.type) {
    case REFRESH_DATABASE_REQUEST:
      return true;
    case REFRESH_DATABASE_SUCCESS:
      return false;
    case REFRESH_DATABASE_FAILURE:
      return false;
    default:
      return state;
  }
};
