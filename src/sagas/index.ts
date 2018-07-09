import { takeLatest, takeEvery } from 'redux-saga/effects';
import {
  CONNECT_ACCOUNT_REQUEST,
  FETCH_QUEUE_REQUEST,
  FETCH_TURKOPTICON_REQUEST,
  RETURN_HIT_REQUEST,
  SEARCH_REQUEST,
  ACCEPT_HIT_REQUEST,
  STATUS_DETAIL_REQUEST,
  STATUS_SUMMARY_REQUEST,
  REFRESH_DATABASE_REQUEST,
  SCHEDULE_NEXT_SEARCH,
  SCHEDULE_NEXT_WATCHER_TICK,
  TOGGLE_SEARCH_ACTIVITY,
  READ_PERSISTED_STATE,
  UPLOAD_REQUEST,
  PLAY_AUDIO,
  WRITE_PERSISTED_STATE,
  NOTIFICATION_PERM_REQUEST,
  SEND_NOTIFICATION,
  ACCEPT_HIT_FROM_WATCHER,
  SEARCH_SUCCESS
} from '../constants';
import { ConnectAccountRequest } from '../actions/connectAccount';
import { FetchQueueRequest } from '../actions/queue';
import { ReturnHitRequest } from '../actions/return';
import { SearchRequest, SearchSuccess } from '../actions/search';
import { ScheduleNextSearch } from '../actions/scheduler';
import {
  AcceptHitRequest,
  AcceptHitRequestFromWatcher
} from '../actions/accept';
import { FetchTOpticonRequest } from '../actions/turkopticon';
import { FetchStatusSummaryRequest } from '../actions/statusSummary';
import { RefreshDatabaseRequest } from '../actions/refreshDatabase';
import { ToggleSearchActive } from '../actions/updateValue';
import { ReadPersistedState, WritePersistedState } from '../actions/backup';
import { ScheduleWatcherTick } from '../actions/watcher';
import { FetchStatusDetailRequest } from '../actions/statusDetail';
import { PlayAudio } from '../actions/audio';
import { UploadRequest } from '../actions/upload';

import { fetchAccountInfo } from './connectAccount';
import { fetchUserQueue } from './fetchQueue';
import { fetchSearchResults } from './fetchSearch';
import { returnHit } from './returnHit';
import { searchAfterDelay } from './scheduleSearch';
import { acceptHit } from './acceptHit';
import { fetchTurkopticon, requestDataForUnseenRequesters } from './fetchTurkopticon';
import { toggleSearchActive } from './toggleSearchActive';
import { acceptHitAfterWatcherDelay } from './scheduleWatcher';
import { handleStatusDetailRequest } from './statusDetail';
import { handleStatusSummaryRequest } from './statusSummary';
import { handleStatusSummarySuccess } from './refreshHitDb';
import { downloadPersistedState, importPersistedState } from './backup';
import { playAudioSaga } from './playAudio';
import { handleFileUploadRequest } from './uploadFile';
import {
  resolveNotificationPermissionRequest,
  createDesktopNotification,
  sendNotificationForSearchResult
} from './notifications';
import {
  NotificationPermissionRequest,
  SendNotification
} from '../actions/notifications';
import { acceptHitFromWatcher } from './acceptHitWatcher';

export default function* rootSaga() {
  yield takeLatest<ScheduleNextSearch>(SCHEDULE_NEXT_SEARCH, searchAfterDelay);
  yield takeLatest<SearchSuccess>(
    SEARCH_SUCCESS,
    sendNotificationForSearchResult
  );
  yield takeLatest<SearchSuccess>(SEARCH_SUCCESS, requestDataForUnseenRequesters);
  yield takeLatest<FetchTOpticonRequest>(
    FETCH_TURKOPTICON_REQUEST,
    fetchTurkopticon
  );
  yield takeLatest<ToggleSearchActive>(
    TOGGLE_SEARCH_ACTIVITY,
    toggleSearchActive
  );
  yield takeLatest<FetchStatusSummaryRequest>(
    STATUS_SUMMARY_REQUEST,
    handleStatusSummaryRequest
  );
  yield takeLatest<RefreshDatabaseRequest>(
    REFRESH_DATABASE_REQUEST,
    handleStatusSummarySuccess
  );
  yield takeLatest<NotificationPermissionRequest>(
    NOTIFICATION_PERM_REQUEST,
    resolveNotificationPermissionRequest
  );
  yield takeLatest<SearchRequest>(SEARCH_REQUEST, fetchSearchResults);
  yield takeLatest<WritePersistedState>(
    WRITE_PERSISTED_STATE,
    importPersistedState
  );
  yield takeEvery<ConnectAccountRequest>(
    CONNECT_ACCOUNT_REQUEST,
    fetchAccountInfo
  );
  yield takeEvery<FetchQueueRequest>(FETCH_QUEUE_REQUEST, fetchUserQueue);
  yield takeEvery<ReturnHitRequest>(RETURN_HIT_REQUEST, returnHit);
  yield takeEvery<AcceptHitRequest>(ACCEPT_HIT_REQUEST, acceptHit);
  yield takeEvery<AcceptHitRequestFromWatcher>(
    ACCEPT_HIT_FROM_WATCHER,
    acceptHitFromWatcher
  );
  yield takeEvery<FetchStatusDetailRequest>(
    STATUS_DETAIL_REQUEST,
    handleStatusDetailRequest
  );
  yield takeEvery<ScheduleWatcherTick>(
    SCHEDULE_NEXT_WATCHER_TICK,
    acceptHitAfterWatcherDelay
  );
  yield takeEvery<PlayAudio>(PLAY_AUDIO, playAudioSaga);
  yield takeEvery<ReadPersistedState>(
    READ_PERSISTED_STATE,
    downloadPersistedState
  );
  yield takeEvery<SendNotification>(
    SEND_NOTIFICATION,
    createDesktopNotification
  );
  yield takeEvery<UploadRequest>(UPLOAD_REQUEST, handleFileUploadRequest);
}
