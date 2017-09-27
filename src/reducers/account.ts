import { MaybeAccount } from '../types';
import { ConnectAccountAction } from '../actions/connectAccount';
import { CONNECT_ACCOUNT_SUCCESS, DISCONNECT_ACCOUNT } from '../constants';

export default (
  state: MaybeAccount = null,
  action: ConnectAccountAction
): MaybeAccount => {
  switch (action.type) {
    case DISCONNECT_ACCOUNT:
      return null;
    case CONNECT_ACCOUNT_SUCCESS:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
