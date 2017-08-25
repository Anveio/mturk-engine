import { takeLatest } from 'redux-saga/effects';
import { FETCH_QUEUE_REQUEST } from '../constants';
import { QueueAction } from '../actions/queue';
import { fetchUserQueue } from './fetchQueue';

export default function* rootSaga() {
  yield takeLatest<QueueAction>(FETCH_QUEUE_REQUEST, fetchUserQueue);
}
