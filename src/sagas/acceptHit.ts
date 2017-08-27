import { call, put } from 'redux-saga/effects';
import {
  AcceptHitRequest,
  acceptHitFailure,
  AcceptHitFailure,
  acceptHitSuccess,
  AcceptHitSuccess
} from '../actions/accept';
import { validateHitAcceptRequest } from '../api/acceptHit';
import { searchItemToQueueItem } from '../utils/queueItem';
import { generateAcceptHitToast } from '../utils/toastr';

export function* acceptHit(action: AcceptHitRequest) {
  const { groupId, title } = action.data;
  try {
    const successful: boolean = yield call(validateHitAcceptRequest, groupId);
    generateAcceptHitToast(successful, title);
    const newQueueItem = searchItemToQueueItem(action.data);
    yield put<AcceptHitSuccess>(acceptHitSuccess(newQueueItem));
  } catch (e) {
    generateAcceptHitToast(false, title);
    yield put<AcceptHitFailure>(acceptHitFailure());
  }
}
