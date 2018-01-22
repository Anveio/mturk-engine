import { SearchResult } from '../types';

export var requestNotificationPermission = async (): Promise<
  NotificationPermission
> => {
  try {
    return await Notification.requestPermission();
  } catch (e) {
    console.warn(e);
    return 'denied';
  }
};

export const acceptHitOnClick = ({ groupId }: SearchResult) => () =>
  window.open(
    `https://worker.mturk.com/projects/${groupId}/tasks/accept_random`
  );
