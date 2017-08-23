import { BlockedHit, HitBlocklistMap } from '../types';
import { BlockAction } from '../actions/blocklist';
import { BLOCK_HIT_GROUP, UNBLOCK_HIT_GROUP } from '../constants';
import { Map } from 'immutable';

const initial: HitBlocklistMap = Map<string, BlockedHit>();

export default (state = initial, action: BlockAction): HitBlocklistMap => {
  switch (action.type) {
    case BLOCK_HIT_GROUP:
      return state.merge(action.data);
    case UNBLOCK_HIT_GROUP:
      return state.delete(action.groupId);
    default:
      return state;
  }
};
