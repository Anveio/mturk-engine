import {
  NOTIFICATION_PERM_UPDATE,
  TOGGLE_NOTIFICATIONS,
  UPDATE_FIELD
} from '../constants';
import { NotificationSettings } from '../types';
import {
  NotificationPermissionUpdate,
  ToggleNotifications
} from '../actions/notifications';
import { FormUpdate } from '../actions/form';

const initial: NotificationSettings = {
  hasPermission: false,
  enabled: false,
  minReward: 0.75,
  durationInSeconds: 6
};

type NotificationAction =
  | NotificationPermissionUpdate
  | ToggleNotifications
  | FormUpdate<NotificationSettings>;

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
    case UPDATE_FIELD:
      if (action.form === 'notificationSettings') {
        return {
          ...state,
          [action.field]: action.value
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};
