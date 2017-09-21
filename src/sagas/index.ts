import { takeLatest, takeEvery } from 'redux-saga/effects';
import {
  FETCH_QUEUE_REQUEST,
  FETCH_TURKOPTICON_REQUEST,
  RETURN_HIT_REQUEST,
  SEARCH_REQUEST,
  ACCEPT_HIT_REQUEST,
  SCHEDULE_NEXT_SEARCH,
  SCHEDULE_NEXT_WATCHER_TICK,
  TOGGLE_SEARCH_ACTIVITY,
  TOGGLE_WATCHER_ACTIVE,
  PLAY_AUDIO
} from '../constants';
import { FetchQueueRequest } from '../actions/queue';
import { ReturnHitRequest } from '../actions/return';
import { SearchRequest } from '../actions/search';
import { ScheduleNextSearch } from '../actions/scheduler';
import { AcceptHitRequest } from '../actions/accept';
import { FetchTOpticonRequest } from '../actions/turkopticon';
import { ToggleSearchActive } from '../actions/searchActivity';
import { ToggleWatcherActivity, ScheduleWatcherTick } from '../actions/watcher';
import { PlayAudio } from '../actions/audio';

import { fetchUserQueue } from './fetchQueue';
import { fetchSearchResults } from './fetchSearch';
import { returnHit } from './returnHit';
import { searchAfterDelay } from './scheduleSearch';
import { acceptHit } from './acceptHit';
import { fetchTurkopticon } from './fetchTurkopticon';
import { toggleSearchActive } from './toggleSearchActive';
import { toggleWatcherActive } from './toggleWatcherActive';
import { acceptAfterWatcherDelay } from './scheduleWatcher';
import { playAudio } from './playAudio';

export default function* rootSaga() {
  yield takeLatest<FetchQueueRequest>(FETCH_QUEUE_REQUEST, fetchUserQueue);
  yield takeLatest<ReturnHitRequest>(RETURN_HIT_REQUEST, returnHit);
  yield takeLatest<SearchRequest>(SEARCH_REQUEST, fetchSearchResults);
  yield takeLatest<ScheduleNextSearch>(SCHEDULE_NEXT_SEARCH, searchAfterDelay);
  yield takeEvery<AcceptHitRequest>(ACCEPT_HIT_REQUEST, acceptHit);
  yield takeLatest<FetchTOpticonRequest>(
    FETCH_TURKOPTICON_REQUEST,
    fetchTurkopticon
  );
  yield takeLatest<ToggleSearchActive>(
    TOGGLE_SEARCH_ACTIVITY,
    toggleSearchActive
  );
  yield takeEvery<ToggleWatcherActivity>(
    TOGGLE_WATCHER_ACTIVE,
    toggleWatcherActive
  );
  yield takeEvery<ScheduleWatcherTick>(
    SCHEDULE_NEXT_WATCHER_TICK,
    acceptAfterWatcherDelay
  );
  yield takeEvery<PlayAudio>(PLAY_AUDIO, playAudio);
}
