import { BlockedHit, HitBlockMap, GroupId } from '../types';
import { BlockHitAction } from 'actions/blockHit';
import { HIT_BLOCKLIST_ADD, HIT_BLOCKLIST_REMOVE } from '../constants';
import { Map } from 'immutable';

const initial: HitBlockMap = Map<GroupId, BlockedHit>();

export default (state = initial, action: BlockHitAction): HitBlockMap => {
  switch (action.type) {
    case HIT_BLOCKLIST_ADD:
      return action.data.reduce(
        (acc: HitBlockMap, cur: BlockedHit) => acc.set(cur.groupId, cur),
        state
      );
    case HIT_BLOCKLIST_REMOVE:
      return state.filterNot((blockedHit: BlockedHit) =>
        action.groupIds.has(blockedHit.groupId)
      ) as HitBlockMap;
    default:
      return state;
  }
};
