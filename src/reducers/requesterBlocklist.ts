import { BlockedRequester, RequesterBlockMap } from '../types';
import { BlockRequesterAction } from '../actions/blockRequester';
import { BLOCK_REQUESTER, UNBLOCK_REQUESTER } from '../constants';
import { Map } from 'immutable';

const initial: RequesterBlockMap = Map<string, BlockedRequester>();

export default (state = initial, action: BlockRequesterAction): RequesterBlockMap => {
  switch (action.type) {
    case BLOCK_REQUESTER:
      return state.set(action.data.id, action.data);
    case UNBLOCK_REQUESTER:
      return state.delete(action.requesterId);
    default:
      return state;
  }
};
