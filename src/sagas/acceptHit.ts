import { call, put } from 'redux-saga/effects';
import {
  AcceptHitRequest,
  acceptHitFailure,
  AcceptHitFailure,
  acceptHitSuccess,
  AcceptHitSuccess
} from '../actions/accept';
import { ScheduleWatcherTick, scheduleWatcher } from '../actions/watcher';
import { validateHitAcceptRequest } from '../api/acceptHit';
import { searchItemToQueueItem, blankQueueItem } from '../utils/queueItem';
import { generateAcceptHitToast } from '../utils/toaster';
import { calculateTimeFromDelay } from '../utils/scheduler';

export function* acceptHit(action: AcceptHitRequest) {
  const { groupId, data } = action;
  try {
    const successful: boolean = yield call(validateHitAcceptRequest, groupId);

    const newQueueItem = data
      ? searchItemToQueueItem(data)
      : blankQueueItem(groupId);

    if (successful) {
      generateAcceptHitToast(successful, newQueueItem.title);
      yield put<AcceptHitSuccess>(acceptHitSuccess(newQueueItem));
    } else if (action.fromWatcher && !successful) {
      yield put<AcceptHitFailure>(acceptHitFailure());
    } else if (!action.fromWatcher && !successful) {
      yield put<AcceptHitFailure>(acceptHitFailure());
      generateAcceptHitToast(successful, newQueueItem.title);
    }

    if (action.fromWatcher && action.delay) {
      yield put<ScheduleWatcherTick>(
        scheduleWatcher(action.groupId, calculateTimeFromDelay(action.delay))
      );
    }
  } catch (e) {
    yield put<AcceptHitFailure>(acceptHitFailure());
  }
}
