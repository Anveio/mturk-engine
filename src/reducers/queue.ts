import { QueueItem, QueueMap } from '../types';
import { QueueAction } from '../actions/queue';
import { ReturnAction } from '../actions/return';

import { FETCH_QUEUE_SUCCESS, RETURN_HIT_SUCCESS } from '../constants';
import { Map } from 'immutable';

const initial: QueueMap = Map<string, QueueItem>();

type QueueTableAction = QueueAction | ReturnAction;

export default (state = initial, action: QueueTableAction): QueueMap => {
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
