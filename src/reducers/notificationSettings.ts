import {
  NOTIFICATION_PERM_UPDATE,
  EDIT_NOTIFICATION_THRESHOLD,
  TOGGLE_NOTIFICATIONS
} from '../constants';
import { NotificationSettings } from '../types';
import {
  NotificationPermissionUpdate,
  EditNotificationThreshold,
  ToggleNotifications
} from '../actions/notifications';

const initial: NotificationSettings = {
  hasPermission: false,
  enabled: false,
  minReward: 0.75
};

type NotificationAction =
  | NotificationPermissionUpdate
  | ToggleNotifications
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
    case TOGGLE_NOTIFICATIONS:
      return {
        ...state,
        enabled: !state.enabled
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
