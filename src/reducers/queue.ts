import { SearchItem, SearchMap } from '../types';
import { QueueAction } from '../actions/queue';
import { FETCH_QUEUE_SUCCESS } from '../constants';
import { Map } from 'immutable';

const initial: SearchMap = Map<string, SearchItem>();

export default (state = initial, action: QueueAction): SearchMap => {
  let partialState: SearchMap | undefined;

  switch (action.type) {
    case FETCH_QUEUE_SUCCESS:
      partialState = action.data;
      break;
    default:
      return state;
  }

  return partialState;
};
