import { GroupId } from '../types';
import { SEND_NOTIFICATION } from '../constants';
import { Set } from 'immutable';
import { SendNotification } from '../actions/notifications';

const initial = Set<GroupId>();

export default (state = initial, action: SendNotification): Set<GroupId> => {
  switch (action.type) {
    case SEND_NOTIFICATION:
      return state.add(action.hit.groupId);
    default:
      return state;
  }
};
