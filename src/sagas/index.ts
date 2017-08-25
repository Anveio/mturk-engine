import { takeLatest } from 'redux-saga/effects';
import {
  FETCH_QUEUE_REQUEST,
  RETURN_HIT_REQUEST,
  SEARCH_REQUEST
} from '../constants';
import { QueueAction } from '../actions/queue';
import { ReturnAction } from '../actions/return';
import { SearchAction } from '../actions/search';
import { fetchUserQueue } from './fetchQueue';
import { fetchSearch } from './fetchSearch';
import { returnHit } from './returnHit';

export default function* rootSaga() {
  yield takeLatest<QueueAction>(FETCH_QUEUE_REQUEST, fetchUserQueue);
  yield takeLatest<ReturnAction>(RETURN_HIT_REQUEST, returnHit);
  yield takeLatest<SearchAction>(SEARCH_REQUEST, fetchSearch);
}
