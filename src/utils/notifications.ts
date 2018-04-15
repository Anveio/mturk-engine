import { SearchResult } from '../types';
import { formatAsUsd } from './formatting';
import { secondsToMinutes } from './dates';

export const requestNotificationPermission = async (): Promise<
  NotificationPermission
> => {
  try {
    return await Notification.requestPermission();
  } catch (e) {
    console.warn(e);
    return 'denied';
  }
};
export const createNotificationFromSearchResult = (
  hit: SearchResult
): Notification => {
  const { title, reward, description, timeAllottedInSeconds } = hit;
  const notification = new Notification(
    `${formatAsUsd(reward)} - ${title}`,
    {
      body: `Click to accept - ${secondsToMinutes(
        timeAllottedInSeconds
      )} minutes allotted - ${description}`
    }
  );
  notification.onclick = acceptHitOnClick(hit);
  return notification;
};

export const acceptHitOnClick = ({ groupId }: SearchResult) => () =>
  window.open(
    `https://worker.mturk.com/projects/${groupId}/tasks/accept_random`
  );
