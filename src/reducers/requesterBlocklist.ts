import { BlockedRequester, RequesterBlockMap, RequesterId } from '../types';
import { BlockRequesterAction } from '../actions/blockRequester';
import {
  BLOCK_REQUESTER,
  UNBLOCK_REQUESTER,
  UNBLOCK_MULTIPLE_REQUESTERS
} from '../constants';
import { Map } from 'immutable';

const initial: RequesterBlockMap = Map<RequesterId, BlockedRequester>();

export default (
  state = initial,
  action: BlockRequesterAction
): RequesterBlockMap => {
  switch (action.type) {
    case BLOCK_REQUESTER:
      return state.set(action.data.id, action.data);
    case UNBLOCK_REQUESTER:
      return state.delete(action.requesterId);
    case UNBLOCK_MULTIPLE_REQUESTERS:
      return state.filterNot((blockedRequester: BlockedRequester) =>
        action.requesterIds.has(blockedRequester.id)
      ) as RequesterBlockMap;
    default:
      return state;
  }
};
