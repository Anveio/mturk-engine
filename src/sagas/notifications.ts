import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  NotificationPermissionRequest,
  NotificationPermissionUpdate,
  notificationPermissionFailure,
  notificationPermissionSuccess,
  SendNotification
} from '../actions/notifications';
import {
  requestNotificationPermission,
  acceptHitOnClick
} from '../utils/notifications';
import { notificationPermissionGrantedToast } from '../utils/toaster';

export function* resolveNotificationPermissionRequest(
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
        notificationPermissionGrantedToast();
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
  const x = new Notification(action.hit.title, {
    body: `Click to accept: ` + action.hit.description
  });
  x.onclick = acceptHitOnClick(action.hit);
  yield delay(6000);
  x.close();
}
