import {
  NOTIFICATION_PERM_REQUEST,
  NOTIFICATION_PERM_UPDATE
} from '../constants/index';

export interface NotificationPermissionRequest {
  readonly type: NOTIFICATION_PERM_REQUEST;
}

export interface NotificationPermissionUpdate {
  readonly type: NOTIFICATION_PERM_UPDATE;
  readonly value: boolean;
}

export const updateNotificationPermission = (
  value: boolean
): NotificationPermissionUpdate => ({
  type: NOTIFICATION_PERM_UPDATE,
  value
});

export const notificationPermissionFailure = (): NotificationPermissionUpdate => ({
  type: NOTIFICATION_PERM_UPDATE,
  value: false
});

export const notificationPermissionSuccess = (): NotificationPermissionUpdate => ({
  type: NOTIFICATION_PERM_UPDATE,
  value: true
});
