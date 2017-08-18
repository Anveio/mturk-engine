import { QueueItem, QueueMap } from '../types';
import { QueueAction } from '../actions/queue';
import { FETCH_QUEUE_SUCCESS } from '../constants';
import { Map } from 'immutable';

const initial: QueueMap = Map<string, QueueItem>();

export default (state = initial, action: QueueAction): QueueMap => {
  let partialState: QueueMap | undefined;

  switch (action.type) {
    case FETCH_QUEUE_SUCCESS:
      partialState = action.data;
      break;
    default:
      return state;
  }

  return partialState;
};
