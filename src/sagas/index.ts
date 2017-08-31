import { takeLatest } from 'redux-saga/effects';
import {
  FETCH_QUEUE_REQUEST,
  FETCH_TURKOPTICON_REQUEST,
  RETURN_HIT_REQUEST,
  SEARCH_REQUEST,
  ACCEPT_HIT_REQUEST
} from '../constants';
import { FetchQueueRequest } from '../actions/queue';
import { ReturnHitRequest } from '../actions/return';
import { SearchRequest } from '../actions/search';
import { AcceptHitRequest } from '../actions/accept';
import { FetchTOpticonRequest } from '../actions/turkopticon';

import { fetchUserQueue } from './fetchQueue';
import { fetchSearchResults } from './fetchSearch';
import { returnHit } from './returnHit';
import { acceptHit } from './acceptHit';
import { fetchTurkopticon } from './fetchTurkopticon';

export default function* rootSaga() {
  yield takeLatest<FetchQueueRequest>(FETCH_QUEUE_REQUEST, fetchUserQueue);
  yield takeLatest<ReturnHitRequest>(RETURN_HIT_REQUEST, returnHit);
  yield takeLatest<SearchRequest>(SEARCH_REQUEST, fetchSearchResults);
  yield takeLatest<AcceptHitRequest>(ACCEPT_HIT_REQUEST, acceptHit);
  yield takeLatest<FetchTOpticonRequest>(
    FETCH_TURKOPTICON_REQUEST,
    fetchTurkopticon
  );
}
