import {
  NOTIFICATION_PERM_UPDATE,
  EDIT_NOTIFICATION_THRESHOLD
} from '../constants';
import { NotificationSettings } from '../types';
import {
  NotificationPermissionUpdate,
  EditNotificationThreshold
} from '../actions/notifications';

const initial: NotificationSettings = {
  hasPermission: false,
  enabled: false,
  minReward: 0.75
};

type NotificationAction =
  | NotificationPermissionUpdate
  | EditNotificationThreshold;

export default (
  state = initial,
  action: NotificationAction
): NotificationSettings => {
  switch (action.type) {
    case NOTIFICATION_PERM_UPDATE:
      return {
        ...state,
        hasPermission: action.value
      };
    case EDIT_NOTIFICATION_THRESHOLD:
      return {
        ...state,
        minReward: action.value
      };
    default:
      return state;
  }
};
