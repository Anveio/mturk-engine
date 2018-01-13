import { ToggleNotificationPermission } from '../actions/updateValue';
import { TOGGLE_NOTIFICATION_PERMISSION } from '../constants';
import { NotificationSettings } from '../types';

const initial: NotificationSettings = {
  enabled: false,
  minReward: 0.75
};

export default (
  state = initial,
  action: ToggleNotificationPermission
): NotificationSettings => {
  switch (action.type) {
    case TOGGLE_NOTIFICATION_PERMISSION:
      return {
        ...state,
        enabled: !state.enabled
      };
    default:
      return state;
  }
};
