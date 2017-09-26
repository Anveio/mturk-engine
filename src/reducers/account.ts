import { MaybeAccount } from '../types';
import { ConnectAccountAction } from '../actions/connectAccount';
import { CONNECT_ACCOUNT_SUCCESS } from '../constants';



export default (
  state: MaybeAccount = null,
  action: ConnectAccountAction
): MaybeAccount => {
  switch (action.type) {
    case CONNECT_ACCOUNT_SUCCESS:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
