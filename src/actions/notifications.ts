import {
  NOTIFICATION_PERM_REQUEST,
  NOTIFICATION_PERM_UPDATE,
  TOGGLE_NOTIFICATIONS,
  SEND_NOTIFICATION
} from '../constants/index';
import { SearchResult } from '../types';

export type EditableNotificationField = 'minReward' | 'durationInSeconds';

export interface SendNotification {
  readonly type: SEND_NOTIFICATION;
  readonly hit: SearchResult;
  readonly durationInSeconds: number;
}

export interface NotificationPermissionRequest {
  readonly type: NOTIFICATION_PERM_REQUEST;
}

export interface NotificationPermissionUpdate {
  readonly type: NOTIFICATION_PERM_UPDATE;
  readonly value: boolean;
}

export interface ToggleNotifications {
  readonly type: TOGGLE_NOTIFICATIONS;
}

export type NotificationAction =
  | SendNotification
  | NotificationPermissionRequest
  | NotificationPermission
  | ToggleNotifications;

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

export const toggleNotifications = (): ToggleNotifications => ({
  type: TOGGLE_NOTIFICATIONS
});

export const sendNotification = (
  hit: SearchResult,
  durationInSeconds: number
): SendNotification => ({
  type: SEND_NOTIFICATION,
  hit,
  durationInSeconds
});
