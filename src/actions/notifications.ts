import {
  NOTIFICATION_PERM_REQUEST,
  NOTIFICATION_PERM_UPDATE,
  EDIT_NOTIFICATION_THRESHOLD,
  TOGGLE_NOTIFICATIONS,
  SEND_NOTIFICATION
} from '../constants/index';
import { SearchResult } from '../types';

export interface SendNotification {
  readonly type: SEND_NOTIFICATION;
  readonly hit: SearchResult;
}

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

export interface ToggleNotifications {
  readonly type: TOGGLE_NOTIFICATIONS;
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

export const toggleNotifications = (): ToggleNotifications => ({
  type: TOGGLE_NOTIFICATIONS
});

export const sendNotification = (hit: SearchResult): SendNotification => ({
  type: SEND_NOTIFICATION,
  hit
});
