import { BlockedRequester, RequesterBlockMap, RequesterId } from '../types';
import { BlockRequesterAction } from '../actions/blockRequester';
import {
  REQUESTER_BLOCKLIST_ADD,
  REQUESTER_BLOCKLIST_REMOVE,
} from '../constants';
import { Map } from 'immutable';

const initial: RequesterBlockMap = Map<RequesterId, BlockedRequester>();

export default (
  state = initial,
  action: BlockRequesterAction
): RequesterBlockMap => {
  switch (action.type) {
    case REQUESTER_BLOCKLIST_ADD:
      return action.data.reduce(
        (acc: RequesterBlockMap, cur: BlockedRequester) => acc.set(cur.id, cur),
        state
      );
    case REQUESTER_BLOCKLIST_REMOVE:
      return state.filterNot((blockedRequester: BlockedRequester) =>
        action.requesterIds.has(blockedRequester.id)
      ) as RequesterBlockMap;
    default:
      return state;
  }
};
