import { QueueItem, QueueMap, HitId } from '../types';
import { QueueAction } from '../actions/queue';
import { ReturnAction } from '../actions/return';
import { AcceptAction } from '../actions/accept';
import {
  FETCH_QUEUE_SUCCESS,
  RETURN_HIT_SUCCESS,
  ACCEPT_HIT_SUCCESS
} from '../constants';
import { Map } from 'immutable';

const initial: QueueMap = Map<HitId, QueueItem>();

type QueueTableAction = QueueAction | ReturnAction | AcceptAction;

export default (state = initial, action: QueueTableAction): QueueMap => {
  switch (action.type) {
    case FETCH_QUEUE_SUCCESS:
      return action.data;
    case RETURN_HIT_SUCCESS:
      return state.delete(action.hitId);
    case ACCEPT_HIT_SUCCESS:
      return state.set(action.data.hitId, action.data);
    default:
      return state;
  }
};
