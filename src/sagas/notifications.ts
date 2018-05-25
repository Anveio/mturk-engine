import { delay } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import {
  NotificationPermissionRequest,
  NotificationPermissionUpdate,
  notificationPermissionFailure,
  notificationPermissionSuccess,
  SendNotification,
  sendNotification
} from '../actions/notifications';
import {
  requestNotificationPermission,
  createNotificationFromSearchResult
} from '../utils/notifications';
import {
  notificationPermissionGrantedToast,
  notificationPermissionBlockedToast
} from '../utils/toaster';
import { SearchSuccess } from 'actions/search';
import { topPayingResultSuitableForNotification } from 'selectors/notificationSettings';
import { NotificationSettings, SearchResult } from 'types';
import { notificationSettingsSelector } from 'selectors';

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
        notificationPermissionBlockedToast();
    }
  } catch (e) {
    yield put<NotificationPermissionUpdate>(notificationPermissionFailure());
  }
}

export function* sendNotificationForSearchResult(action: SearchSuccess) {
  const hit: SearchResult | undefined = yield select(
    topPayingResultSuitableForNotification
  );
  const { enabled, durationInSeconds }: NotificationSettings = yield select(
    notificationSettingsSelector
  );

  if (enabled && hit) {
    yield put<SendNotification>(sendNotification(hit, durationInSeconds));
  }
}

export function* createDesktopNotification(action: SendNotification) {
  const notification = createNotificationFromSearchResult(action.hit);
  yield delay(action.durationInSeconds * 1000);
  notification.close();
}
