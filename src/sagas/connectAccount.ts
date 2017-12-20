import { call, put } from 'redux-saga/effects';
import {
  ConnectAccountRequest,
  ConnectAccountFailure,
  connectAccountFailure,
  ConnectAccountSuccess,
  connectAccountSuccess
} from '../actions/connectAccount';
import { fetchDashboard } from '../api/dashboard';
import {
  accountConnectionFailedToast,
  accountConnectionSuccessfulToast,
  createGenericWaitingToast,
  updateTopRightToaster
} from '../utils/toaster';

export function* fetchAccountInfo(action: ConnectAccountRequest) {
  try {
    const toasterKey = createGenericWaitingToast('Fetching your dashboard...');

    const accountData = yield call(fetchDashboard);
    updateTopRightToaster(toasterKey, accountConnectionSuccessfulToast);
    yield put<ConnectAccountSuccess>(connectAccountSuccess(accountData));
  } catch (e) {
    console.warn(e);
    accountConnectionFailedToast();
    yield put<ConnectAccountFailure>(connectAccountFailure());
  }
}
