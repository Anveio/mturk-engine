import { call, put } from 'redux-saga/effects';
import {
  AcceptHitRequest,
  acceptHitFailure,
  AcceptHitFailure,
  acceptHitSuccess,
  AcceptHitSuccess
} from '../actions/accept';
import { sendHitAcceptRequest, HitAcceptResponse } from '../api/acceptHit';
import {
  successfulAcceptToast,
  showWaitingToast,
  updateTopRightToaster,
  errorAcceptToast,
  failedAcceptToast
} from '../utils/toaster';
import { queueItemFromSearchResult } from '../utils/queueItem';
import { SearchResult } from '../types';

export function* acceptHit(action: AcceptHitRequest) {
  const toasterKey = showWaitingToast(`Accepting HIT...`);
  const { searchResult } = action;

  try {
    const response: HitAcceptResponse = yield call(
      sendHitAcceptRequest,
      action.groupId
    );

    const { successful } = response;

    yield successful
      ? handleSuccessfulAccept(searchResult, searchResult.title, toasterKey)
      : handleFailedAccept(toasterKey, searchResult);
  } catch (e) {
    yield put<AcceptHitFailure>(acceptHitFailure(searchResult.groupId));
    updateTopRightToaster(toasterKey, errorAcceptToast);
  }
}

function* handleSuccessfulAccept(
  hit: SearchResult,
  title: string,
  key: string
) {
  updateTopRightToaster(key, successfulAcceptToast(title));
  yield put<AcceptHitSuccess>(acceptHitSuccess(queueItemFromSearchResult(hit)));
}

function* handleFailedAccept(key: string, hit: SearchResult) {
  yield put<AcceptHitFailure>(acceptHitFailure(hit.groupId));
  updateTopRightToaster(key, failedAcceptToast(hit));
}
