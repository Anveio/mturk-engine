import { TopRightToaster } from '../';
import { truncate } from './formatting';
import { dateStringToLocaleDateString } from './dates';
import { formatAsCurrency } from './formatting';
import { Toaster, Position, Intent, IToastProps } from '@blueprintjs/core';
import { ImmutablePersistedStateKey, AcceptHitFailureReason } from '../types';
import { failureReasonToWords } from './parsing';
import { GenericWaitingToast } from '../components/Toasts';
// tslint:disable:max-line-length
// tslint:disable:quotemark

const loginLink = {
  href: 'https://www.mturk.com/mturk/beginsignin',
  target: '_blank',
  text: 'Login Page'
};

export const createToastLayer = () =>
  Toaster.create({
    position: Position.TOP_RIGHT
  });

export const updateTopRightToaster = (key: string, newToast: IToastProps) =>
  TopRightToaster.update(key, newToast);

export const createGenericWaitingToast = (message: string) =>
  TopRightToaster.show({
    message: GenericWaitingToast({ message }),
    intent: Intent.NONE
  });

export const copyIdToast = () =>
  TopRightToaster.show({
    message: 'Worker ID copied to clipboard.',
    timeout: 2000
  });

export const copyMarkdownToast = (title: string) =>
  TopRightToaster.show({
    message: `HIT: "${title}"'s markdown was added to your clipboard.`
  });

export const addWatcherToast = (title: string) =>
  TopRightToaster.show({
    message: `Watcher added. Look for "${title}" in the watchers tab.`,
    intent: 0
  });

export const failedSearchToast = () => {
  TopRightToaster.show({
    message: `Your search returned no results. Make sure you're logged in and check your search settings.`,
    action: loginLink,
    intent: 2,
    timeout: 3000
  });
};

export const generateQueueToast = (notEmpty: boolean): IToastProps =>
  notEmpty ? successfulQueueToast : emptyQueueToast;

export const failedQueueToast = () => {
  TopRightToaster.show({
    message: `There was a problem refreshing your queue. Make sure you're still logged in.`,
    action: loginLink,
    intent: 2,
    timeout: 5000
  });
};

export const generateReturnToast = (successful: boolean) => {
  return successful ? successfulReturnToast() : errorReturnToast();
};

export const statusDetailToast = (dateStr: string, noDataFound: boolean) => {
  const toastHeader = `Refreshed HITs for the day of 
    ${dateStringToLocaleDateString(dateStr)} 
    . `;

  noDataFound
    ? TopRightToaster.show({
        message: toastHeader + 'No activity was found for this day.',
        intent: 0
      })
    : TopRightToaster.show({
        message:
          toastHeader +
          'Your database has been updated with any new information.',
        intent: 1
      });
};

export const statusDetailErrorToast = (dateStr: string) =>
  TopRightToaster.show({
    message: `Problem getting data for ${dateStringToLocaleDateString(
      dateStr
    )}. This is most likely because you have been logged out of MTurk. Try logging in again.`,
    intent: 2,
    timeout: 5000
  });

export const accountConnectionSuccessfulToast = {
  message: 'Your dashboard has been refreshed.',
  intent: 0
};

export const accountConnectionFailedToast = () => {
  TopRightToaster.show({
    message:
      "Couldn't fetch your dashboard. Make sure you're logged into MTurk and try again.",
    action: loginLink,
    intent: 2,
    timeout: 5000
  });
};

export const emptySummaryPageToast = () =>
  TopRightToaster.show({
    message:
      "No work history found. Make sure you're still logged in and have done a HIT in the past 45 days and try again.",
    intent: 2,
    action: loginLink,
    timeout: 5000
  });

export const refreshDbSuccessToast = (
  uniqueDates: number,
  numNewResults: number
) =>
  TopRightToaster.show({
    message: `Refreshed database and found HITS across ${uniqueDates} unique dates. 
    Found ${numNewResults} previously unfound HITS`,
    intent: 1,
    timeout: 5000
  });

export const refreshDbErrorToast = () =>
  TopRightToaster.show({
    message:
      'There was an error while refreshing your database. You may have been logged out or lost connection while refreshing.',
    intent: 2,
    timeout: 5000
  });

export const successfulEditDailyGoalToast = (value: string) =>
  TopRightToaster.show({
    message: `Daily goal of ${formatAsCurrency(parseFloat(value))} was set.`,
    timeout: 2000
  });

export const successfulEditBonusToast = (value: string) =>
  TopRightToaster.show({
    message: `Bonus of ${formatAsCurrency(
      parseFloat(value)
    )} was set for this HIT.`,
    timeout: 2000
  });

export const deletePersistedStateToast = (key: ImmutablePersistedStateKey) =>
  TopRightToaster.show({
    message: `${key} deleted. Refresh the page to see if your issue was resolved.`,
    timeout: 10000,
    intent: 0
  });

export const failedUploadToast = () =>
  TopRightToaster.show({
    message: `There was a problem with the uploaded file. Your settings have not changed. 
    Make sure you've uploaded a valid Mturk Engine backup file and try again.`,
    timeout: 5000,
    intent: 3
  });

export const failedDownloadStateToast = () =>
  TopRightToaster.show({
    message: 'There was a problem retrieving your settings.',
    timeout: 5000,
    intent: 3
  });

export const successfulDownloadStateToast = () =>
  TopRightToaster.show({
    message:
      'Your settings have been successfully copied and are ready for download.',
    intent: 0
  });

export const failedImportPersistedState = () =>
  TopRightToaster.show({
    message:
      'There was a problem importing the settins from your backup file. Make sure your backup file is valid and try again.',
    timeout: 5000,
    intent: 3
  });

export const successfulAcceptToast = (title: string) =>
  TopRightToaster.show({
    message: `"${truncate(title, 45)}" was added to your queue.`,
    intent: 1,
    timeout: 5000
  });

export const failedAcceptToast = (reason: AcceptHitFailureReason) =>
  TopRightToaster.show({
    message: `That HIT was not added to your queue. ${failureReasonToWords(
      reason
    )}`,
    intent: 2
  });

const successfulQueueToast = {
  message: 'Refreshed queue on ' + new Date().toLocaleTimeString(),
  intent: 0
};

const emptyQueueToast = {
  message: 'Your queue is empty as of ' + new Date().toLocaleTimeString()
};

const successfulReturnToast = () =>
  TopRightToaster.show({
    message: 'A HIT has been removed from your queue.',
    intent: 0
  });

const errorReturnToast = () =>
  TopRightToaster.show({
    message:
      'Problem returning HIT. The HIT you attempted to return is likely no longer in your queue',
    intent: 2
  });

// const repeatReturnToast = () =>
//   // tslint:disable:quotemark
//   TopRightToaster.show({
//     message:
//       "You've already returned this HIT. It's been removed from your queue.",
//     intent: -1
//   });
