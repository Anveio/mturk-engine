import {
  NOTIFICATION_PERM_REQUEST,
  NOTIFICATION_PERM_UPDATE,
  EDIT_NOTIFICATION_THRESHOLD
} from '../constants/index';

export interface NotificationPermissionRequest {
  readonly type: NOTIFICATION_PERM_REQUEST;
}

export interface NotificationPermissionUpdate {
  readonly type: NOTIFICATION_PERM_UPDATE;
  readonly value: boolean;
}

export interface EditNotificationThreshold {
  readonly type: EDIT_NOTIFICATION_THRESHOLD;
  readonly value: number;
}

export const updateNotificationPermission = (
  value: boolean
): NotificationPermissionUpdate => ({
  type: NOTIFICATION_PERM_UPDATE,
  value
});

export const notificationPermissionRequest = (): NotificationPermissionRequest => ({
  type: NOTIFICATION_PERM_REQUEST
});

export const notificationPermissionFailure = (): NotificationPermissionUpdate => ({
  type: NOTIFICATION_PERM_UPDATE,
  value: false
});

export const notificationPermissionSuccess = (): NotificationPermissionUpdate => ({
  type: NOTIFICATION_PERM_UPDATE,
  value: true
});

export const editNotificationThreshold = (
  value: number
): EditNotificationThreshold => ({
  type: EDIT_NOTIFICATION_THRESHOLD,
  value
});
