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
    if (successful) {
      const newQueueItem = searchItemToQueueItem(action.data);
      yield put<AcceptHitSuccess>(acceptHitSuccess(newQueueItem));
    } else {
      yield put<AcceptHitFailure>(acceptHitFailure());
    }
  } catch (e) {
    yield put<AcceptHitFailure>(acceptHitFailure());
  }
}
