import { BlockedHit, HitBlockMap, GroupId } from '../types';
import { BlockHitAction } from 'actions/blockHit';
import {
  HIT_BLOCKLIST_ADD,
  HIT_BLOCKLIST_REMOVE,
  HIT_BLOCKLIST_ADD_MULTIPLE,
  HIT_BLOCKLIST_REMOVE_MULTIPLE
} from '../constants';
import { Map } from 'immutable';

const initial: HitBlockMap = Map<GroupId, BlockedHit>();

export default (state = initial, action: BlockHitAction): HitBlockMap => {
  switch (action.type) {
    case HIT_BLOCKLIST_ADD:
      return state.set(action.data.groupId, action.data);
    case HIT_BLOCKLIST_REMOVE:
      return state.delete(action.groupId);
    case HIT_BLOCKLIST_ADD_MULTIPLE:
      return action.data.reduce(
        (acc: HitBlockMap, cur: BlockedHit) => acc.set(cur.groupId, cur),
        state
      );
    case HIT_BLOCKLIST_REMOVE_MULTIPLE:
      return state.filterNot((blockedHit: BlockedHit) =>
        action.groupIds.has(blockedHit.groupId)
      ) as HitBlockMap;
    default:
      return state;
  }
};
