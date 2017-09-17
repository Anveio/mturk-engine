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
import { generateAcceptHitToast } from '../utils/toastr';
import { calculateTimeFromDelay } from '../utils/scheduler';

export function* acceptHit(action: AcceptHitRequest) {
  const { groupId, data } = action;
  try {
    const successful: boolean = yield call(validateHitAcceptRequest, groupId);

    const newQueueItem = data
      ? searchItemToQueueItem(data)
      : blankQueueItem(groupId);

    if (action.fromWatcher && !successful) {
      // tslint:disable-next-line:no-console
      yield put<AcceptHitFailure>(acceptHitFailure());
    } else {
      generateAcceptHitToast(successful, newQueueItem.title);
    }

    if (successful) {
      yield put<AcceptHitSuccess>(acceptHitSuccess(newQueueItem));
    } else if (action.fromWatcher === false) {
      yield put<AcceptHitFailure>(acceptHitFailure());
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
