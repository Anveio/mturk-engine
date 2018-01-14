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
