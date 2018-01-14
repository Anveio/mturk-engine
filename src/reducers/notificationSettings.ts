import { NOTIFICATION_PERM_UPDATE } from '../constants';
import { NotificationSettings } from '../types';
import { NotificationPermissionUpdate } from '../actions/notifications';

const initial: NotificationSettings = {
  hasPermission: false,
  enabled: false,
  minReward: 0.75
};

export default (
  state = initial,
  action: NotificationPermissionUpdate
): NotificationSettings => {
  switch (action.type) {
    case NOTIFICATION_PERM_UPDATE:
      return {
        ...state,
        hasPermission: action.value
      };
    default:
      return state;
  }
};
