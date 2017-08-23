import { BlockedHit, HitBlockMap } from '../types';
import { BlockAction } from '../actions/blocklist';
import { BLOCK_HIT_GROUP, UNBLOCK_HIT_GROUP } from '../constants';
import { Map } from 'immutable';

const initial: HitBlockMap = Map<string, BlockedHit>();

export default (state = initial, action: BlockAction): HitBlockMap => {
  switch (action.type) {
    case BLOCK_HIT_GROUP:
      return state.set(action.data.groupId, action.data);
    case UNBLOCK_HIT_GROUP:
      return state.delete(action.groupId);
    default:
      return state;
  }
};
