import { QueueItem, QueueMap } from '../types';
import { QueueAction, ReturnAction } from '../actions/queue';
import { FETCH_QUEUE_SUCCESS, RETURN_HIT_SUCCESS } from '../constants';
import { Map } from 'immutable';

const initial: QueueMap = Map<string, QueueItem>();

export default (state = initial, action: QueueAction | ReturnAction): QueueMap => {
  let partialState: QueueMap | undefined;

  switch (action.type) {
    case FETCH_QUEUE_SUCCESS:
      partialState = action.data;
      break;
    case RETURN_HIT_SUCCESS:
      partialState = state.delete(action.hitId);
      break;
    default:
      return state;
  }

  return partialState;
};
