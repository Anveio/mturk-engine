import { delay } from 'redux-saga';
import { ScheduleNextSearch } from '../actions/scheduler';

export function* searchAfterDelay(action: ScheduleNextSearch) {
  console.log(Math.abs(action.time.valueOf() - Date.now()));
  yield delay(action.time.valueOf() - Date.now());
  console.log('this was a delayed action');
  try {
  } catch (e) {}
}

