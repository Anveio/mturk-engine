import { BlockedHit, HitBlockMap, GroupId } from '../types';
import { BlockHitAction } from '../actions/blockHitGroup';
import { BLOCK_HIT, UNBLOCK_HIT } from '../constants';
import { Map } from 'immutable';

const initial: HitBlockMap = Map<GroupId, BlockedHit>();

export default (state = initial, action: BlockHitAction): HitBlockMap => {
  switch (action.type) {
    case BLOCK_HIT:
      return state.set(action.data.groupId, action.data);
    case UNBLOCK_HIT:
      return state.delete(action.groupId);
    default:
      return state;
  }
};
