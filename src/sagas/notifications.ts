import { call, put } from 'redux-saga/effects';
import {
  NotificationPermissionRequest,
  NotificationPermissionUpdate,
  notificationPermissionFailure,
  notificationPermissionSuccess,
  SendNotification
} from '../actions/notifications';
import { requestNotificationPermission } from '../utils/notifications';

export function* resolveNotificationRequest(
  action: NotificationPermissionRequest
) {
  try {
    const permission: NotificationPermission = yield call(
      requestNotificationPermission
    );

    switch (permission) {
      case 'granted':
        yield put<NotificationPermissionUpdate>(
          notificationPermissionSuccess()
        );
        break;
      case 'default':
      case 'denied':
      default:
        yield put<NotificationPermissionUpdate>(
          notificationPermissionFailure()
        );
    }
  } catch (e) {
    yield put<NotificationPermissionUpdate>(notificationPermissionFailure());
  }
}

export function* createDesktopNotification(action: SendNotification) {
  console.log(action);
  const x = new Notification(action.hit.title, {
    body: action.hit.description
  });

  x.onclose = console.log;

  yield 1;
}
