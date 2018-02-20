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
  createGenericWaitingToast,
  updateTopRightToaster,
  errorAcceptToast,
  failedAcceptToast
} from '../utils/toaster';
import { queueItemFromSearchResult } from '../utils/queueItem';
import { SearchResult } from '../types';

export function* acceptHit(action: AcceptHitRequest) {
  const toasterKey = createGenericWaitingToast(`Accepting HIT...`);
  try {
    const response: HitAcceptResponse = yield call(
      sendHitAcceptRequest,
      action.groupId
    );

    const { successful } = response;

    yield successful
      ? handleSuccessfulAccept(
          action.searchResult,
          toasterKey,
          action.searchResult && action.searchResult.title
        )
      : handleFailedAccept(toasterKey, action.searchResult);
  } catch (e) {
    yield put<AcceptHitFailure>(acceptHitFailure());
    updateTopRightToaster(toasterKey, errorAcceptToast);
  }
}

function* handleSuccessfulAccept(
  hit: SearchResult,
  key: string,
  title?: string
) {
  try {
    updateTopRightToaster(key, successfulAcceptToast(title));
    yield put<AcceptHitSuccess>(
      acceptHitSuccess(queueItemFromSearchResult(hit))
    );
  } catch (e) {
    /**
     * Even if there is an error at this point, the hit was successfuly accepted.
     */
    updateTopRightToaster(key, successfulAcceptToast(title));
  }
}

function* handleFailedAccept(key: string, hit: SearchResult) {
  yield put<AcceptHitFailure>(acceptHitFailure());
  updateTopRightToaster(key, failedAcceptToast(hit));
}
