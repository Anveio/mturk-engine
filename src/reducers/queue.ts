import {Hit, HitMap} from '../types';
import {QueueAction} from '../actions/queue';
import {FETCH_QUEUE_SUCCESS} from '../constants'
import { Map } from 'immutable';

const initial: HitMap = Map<string, Hit>();

export default (state = initial, action: QueueAction): HitMap => {
  let partialState: HitMap | undefined;

  switch (action.type) {
    case FETCH_QUEUE_SUCCESS:
      partialState = action.data;
      break;
    default:
      return state;
  }

  return partialState;
}