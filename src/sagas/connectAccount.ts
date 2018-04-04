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
  showWaitingToast,
  updateTopRightToaster
} from '../utils/toaster';

export function* fetchAccountInfo(action: ConnectAccountRequest) {
  const toasterKey = showWaitingToast('Fetching your dashboard...');
  try {
    const accountData = yield call(fetchDashboard);
    updateTopRightToaster(toasterKey, accountConnectionSuccessfulToast);
    yield put<ConnectAccountSuccess>(connectAccountSuccess(accountData));
  } catch (e) {
    console.warn(e);
    updateTopRightToaster(toasterKey, accountConnectionFailedToast);
    yield put<ConnectAccountFailure>(connectAccountFailure());
  }
}
