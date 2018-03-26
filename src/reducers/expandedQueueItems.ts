import { Set } from 'immutable';
import { ExpandedQueueItemsSet } from 'types';
import { QueueExpandAction } from 'actions/toggleExpand';
import {
  TOGGLE_QUEUE_ITEM_EXPAND,
  COLLAPSE_ALL_QUEUE_ITEMS
} from '../constants';

const initial: ExpandedQueueItemsSet = Set<string>([]);

export default (state = initial, action: QueueExpandAction) => {
  switch (action.type) {
    case TOGGLE_QUEUE_ITEM_EXPAND:
      return state.get(action.hitId)
        ? state.delete(action.hitId)
        : state.add(action.hitId);
    case COLLAPSE_ALL_QUEUE_ITEMS:
      return state.clear();
    default:
      return state;
  }
};
