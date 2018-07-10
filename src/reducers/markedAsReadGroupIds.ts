import { GroupId } from '../types';
import { MARK_HIT_AS_READ, MARK_ALL_HITS_AS_READ } from '../constants';
import { Set } from 'immutable';
import { MarkAction } from 'actions/markAsRead';

const initial = Set<GroupId>();

export default (state = initial, action: MarkAction): Set<GroupId> => {
  switch (action.type) {
    case MARK_HIT_AS_READ:
      return state.add(action.groupId);
    case MARK_ALL_HITS_AS_READ:
      return state.merge(action.data);
    default:
      return state;
  }
};
