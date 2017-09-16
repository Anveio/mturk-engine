import { call, put } from 'redux-saga/effects';
import {
  AcceptHitRequest,
  acceptHitFailure,
  AcceptHitFailure,
  acceptHitSuccess,
  AcceptHitSuccess
} from '../actions/accept';
import { validateHitAcceptRequest } from '../api/acceptHit';
import { searchItemToQueueItem, blankQueueItem } from '../utils/queueItem';
import { generateAcceptHitToast } from '../utils/toastr';

export function* acceptHit(action: AcceptHitRequest) {
  const { groupId, data } = action;
  try {
    const successful: boolean = yield call(validateHitAcceptRequest, groupId);

    const newQueueItem = data
    ? searchItemToQueueItem(data)
    : blankQueueItem(groupId);

    generateAcceptHitToast(successful, newQueueItem.title);
    if (successful) {
      yield put<AcceptHitSuccess>(acceptHitSuccess(newQueueItem));
    } else if (action.fromWatcher === false){
      yield put<AcceptHitFailure>(acceptHitFailure());
    }
  } catch (e) {
    yield put<AcceptHitFailure>(acceptHitFailure());
  }
}
