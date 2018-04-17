import { truncate, pluralizeHits } from './formatting';
import { dateStringToLocaleDateString } from './dates';
import { formatAsUsd } from './formatting';
import { Intent, IToastProps } from '@blueprintjs/core';
import {
  ImmutablePersistedStateKey,
  SearchResult,
  HumanIntelligenceTask
} from '../types';
import { GenericWaitingToast } from '../components/Toasts';
import store from '../store';
import { addWatcher, scheduleWatcher } from '../actions/watcher';
import { createWatcherWithInfo } from './watchers';
import { TopRightToaster } from '..';
// tslint:disable:max-line-length
// tslint:disable:quotemark

const loginLink = {
  href: 'https://worker.mturk.com/',
  target: '_blank',
  text: 'Login Page'
};

export const updateTopRightToaster = (key: string, newToast: IToastProps) =>
  TopRightToaster.show(newToast, key);

export const sendToTopRightToaster = (toast: IToastProps) =>
  TopRightToaster.show(toast);

export const showWaitingToast = (message: string) =>
  TopRightToaster.show({
    message: GenericWaitingToast({ message }),
    intent: Intent.NONE,
    timeout: 0
  });

export const showPlainToast = (message: string, timeout = 2000) =>
  TopRightToaster.show(plainToast(message, timeout));

export const plainToast = (message: string, timeout = 2000): IToastProps => ({
  message,
  timeout,
  intent: Intent.NONE
});

export const genericWarningToast = (message: string) =>
  TopRightToaster.show({
    message,
    timeout: 4000,
    intent: Intent.WARNING
  });

export const failedSearchToast = () => {
  TopRightToaster.show({
    message: `Your search returned no results. Make sure you're logged in and check your search settings.`,
    action: loginLink,
    intent: Intent.WARNING,
    timeout: 3000
  });
};

export const generateQueueToast = (notEmpty: boolean): IToastProps =>
  notEmpty ? successfulQueueToast : emptyQueueToast;

export const failedQueueToast = {
  message: `There was a problem refreshing your queue. Make sure you're still logged in.`,
  action: loginLink,
  intent: Intent.WARNING,
  timeout: 5000
};

export const generateReturnToast = (successful: boolean, title: string) => {
  return successful ? successfulReturnToast(title) : errorReturnToast(title);
};

export const statusDetailToast = (
  dateStr: string,
  noDataFound: boolean,
  key: string
) => {
  const toastHeader = `Refreshed HITs for the day of ${dateStringToLocaleDateString(
    dateStr
  )}. `;

  noDataFound
    ? TopRightToaster.show(
        {
          message: toastHeader + 'No activity was found for this day.',
          intent: Intent.PRIMARY
        },
        key
      )
    : TopRightToaster.show(
        {
          message:
            toastHeader +
            'Your database has been updated with any new information.',
          intent: Intent.SUCCESS
        },
        key
      );
};

export const statusDetailErrorToast = (dateStr: string) =>
  TopRightToaster.show({
    message: `Problem getting data for ${dateStringToLocaleDateString(
      dateStr
    )}. This is most likely because you have been logged out of MTurk. Try logging in again.`,
    intent: Intent.WARNING,
    timeout: 5000
  });

export const accountConnectionSuccessfulToast = {
  message: 'Your dashboard has been refreshed.',
  intent: Intent.PRIMARY,
  timeout: 1000
};

export const accountConnectionFailedToast = {
  message:
    "Couldn't fetch your dashboard. Make sure you're logged into MTurk and try again.",
  action: loginLink,
  intent: Intent.WARNING,
  timeout: 5000
};

export const emptySummaryPageToast = () =>
  TopRightToaster.show({
    message:
      "No work history found. Make sure you're still logged in and have done a HIT in the past 45 days and try again.",
    intent: Intent.WARNING,
    action: loginLink,
    timeout: 5000
  });

export const refreshDbSuccessToast = (
  uniqueDates: number,
  numNewResults: number
) =>
  TopRightToaster.show({
    message: `Refreshed database and found HITs across ${uniqueDates} unique dates. 
    Found ${numNewResults} previously unfound ${pluralizeHits(numNewResults)}.`,
    intent: Intent.SUCCESS,
    timeout: 5000
  });

export const refreshDbErrorToast = () =>
  TopRightToaster.show({
    message:
      'There was an error while refreshing your database. You may have been logged out or lost connection while refreshing.',
    intent: Intent.WARNING,
    timeout: 5000
  });

export const successfulEditDailyGoalToast = (value: string) =>
  TopRightToaster.show({
    message: `Daily goal of ${formatAsUsd(parseFloat(value))} was set.`,
    timeout: 2000
  });

export const successfulEditBonusToast = (value: string) =>
  TopRightToaster.show({
    message: `Bonus of ${formatAsUsd(parseFloat(value))} was set for this HIT.`,
    timeout: 2000
  });

export const deletePersistedStateToast = (key: ImmutablePersistedStateKey) =>
  TopRightToaster.show({
    message: `${key} deleted. Refresh the page to see if your issue was resolved.`,
    timeout: 10000,
    intent: Intent.PRIMARY
  });

export const failedUploadToast = () =>
  TopRightToaster.show({
    message: `There was a problem with the uploaded file. Your settings have not changed. 
    Make sure you've uploaded a valid Mturk Engine backup file and try again.`,
    timeout: 5000,
    intent: Intent.DANGER
  });

export const failedDownloadStateToast = () =>
  TopRightToaster.show({
    message: 'There was a problem retrieving your settings.',
    timeout: 5000,
    intent: Intent.DANGER
  });

export const successfulDownloadStateToast = () =>
  TopRightToaster.show({
    message:
      'Your settings have been successfully copied and are ready for download.',
    intent: Intent.PRIMARY
  });

export const failedImportPersistedState = () =>
  TopRightToaster.show({
    message:
      'There was a problem importing the settins from your backup file. Make sure your backup file is valid and try again.',
    timeout: 5000,
    intent: Intent.DANGER
  });

export const successfulAcceptToast = (title?: string) => ({
  message: title
    ? `"${truncate(title, 45)}" was added to your queue.`
    : 'A hit was added to your queue',
  intent: Intent.SUCCESS,
  timeout: 5000
});

export const failedAcceptToast = (hit: SearchResult): IToastProps => ({
  message: hit.title
    ? `Failed to add "${hit.title}" to your queue.`
    : `Couldn't add that HIT to your queue.`,
  intent: Intent.WARNING,
  action: {
    text: 'Add as watcher',
    onClick: () => {
      const newWatcher = createWatcherWithInfo(hit);
      store.dispatch(addWatcher(newWatcher));
      watcherAddedToast(hit);
    }
  }
});

export const watcherAddedToast = (hit: HumanIntelligenceTask) =>
  TopRightToaster.show({
    message: `Watcher added. Look for "${
      hit.title
    }" in the Unsorted Watchers folder.`,
    intent: Intent.PRIMARY,
    action: {
      text: 'Start watcher',
      onClick: () => store.dispatch(scheduleWatcher(hit.groupId))
    }
  });

export const errorAcceptToast = {
  message: `There was a problem accepting this HIT. Make sure you're still logged into MTurk and try again.`,
  intent: Intent.WARNING
};

export const notificationPermissionGrantedToast = () =>
  TopRightToaster.show({
    message:
      'Mturk Engine has permission to send you desktop notifications. You can revoke this permission at any time.',
    intent: Intent.PRIMARY
  });

export const notificationPermissionBlockedToast = () =>
  TopRightToaster.show({
    message: `Mturk Engine is blocked from sending you notifications. 
    If you do not see a popup for allowing notifications, you may have to 
    manually allow them with the button on the left of the URL bar.`,
    intent: Intent.WARNING,
    timeout: 9000
  });

const successfulQueueToast = {
  message: 'Your queue has been refreshed.',
  intent: Intent.PRIMARY,
  timeout: 1000
};

const emptyQueueToast = {
  message: 'Your queue is empty as of ' + new Date().toLocaleTimeString(),
  intent: Intent.NONE,
  timeout: 2000
};

const successfulReturnToast = (title: string) => ({
  message: `"${truncate(title, 20)}" has been removed from your queue.`,
  intent: Intent.PRIMARY,
  timeout: 1000
});

const errorReturnToast = (title: string) => ({
  message: `Problem returning ${truncate(
    title,
    20
  )}. It's likely no longer in your queue. Refresh your queue for the most up to date information.`,
  intent: Intent.WARNING
});
