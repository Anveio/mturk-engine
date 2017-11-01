import { TopRightToaster } from '../';
import { HitReturnStatus } from '../api/returnHit';
import { truncate } from './formatting';
import { dateStringToLocaleDateString } from './dates';
import { formatAsCurrency } from './formatting';
import { Toaster, Position } from '@blueprintjs/core';
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

export const copyIdToast = () =>
  TopRightToaster.show({
    message: 'Worker ID copied to clipboard',
    timeout: 2000
  });

export const copyMarkdownToast = (title: string) =>
  TopRightToaster.show({
    message: `${title}'s markdown was added to your clipboard.`
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

export const generateAcceptHitToast = (successful: boolean, title: string) =>
  successful ? successfulAcceptToast(title) : failedAcceptToast(title);

export const generateQueueToast = (notEmpty: boolean) => {
  notEmpty ? successfulQueueToast() : emptyQueueToast();
};

export const failedQueueToast = () => {
  TopRightToaster.show({
    message: `There was a problem refreshing your queue. Make sure you're still logged in.`,
    action: loginLink,
    intent: 2,
    timeout: 5000
  });
};

export const generateReturnToast = (status: HitReturnStatus) => {
  switch (status) {
    case 'error':
      return errorReturnToast();
    case 'repeat':
      return repeatReturnToast();
    case 'success':
      return successfulReturnToast();
    default:
      return errorReturnToast();
  }
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
    intent: 3,
    timeout: 5000
  });

export const accountConnectionSuccessfulToast = () => {
  TopRightToaster.show({
    message: 'Your dashboard has been refreshed.',
    intent: 0
  });
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
      "Problem getting your recent HITs. Make sure you're logged in and have done a HIT in the past 45 days and try again.",
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

export const deletePersistedStateToast = (key: string) =>
  TopRightToaster.show({
    message: `${key} deleted. Refresh the page to see if your issue was resolved.`,
    timeout: 10000,
    intent: 0
  });

const successfulAcceptToast = (title: string) =>
  title.startsWith('[Refresh Required]')
    ? TopRightToaster.show({
        message: 'A HIT was added to your queue.',
        intent: 1,
        timeout: 5000
      })
    : TopRightToaster.show({
        message: `"${truncate(title, 45)}" was added to your queue.`,
        intent: 1,
        timeout: 5000
      });

const failedAcceptToast = (title: string) =>
  TopRightToaster.show({
    message: `"${truncate(
      title,
      45
    )}" was not added to your queue. You may not be qualified, or no HITs may be available, or you may need to solve a CAPTCHA.`,
    intent: 2
  });

const successfulQueueToast = () =>
  TopRightToaster.show({
    message: 'Refreshed queue on ' + new Date().toLocaleTimeString(),
    intent: 0
  });

const emptyQueueToast = () =>
  TopRightToaster.show({
    message: 'Your queue is empty as of ' + new Date().toLocaleTimeString()
  });

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

const repeatReturnToast = () =>
  // tslint:disable:quotemark
  TopRightToaster.show({
    message:
      "You've already returned this HIT. It's been removed from your queue.",
    intent: -1
  });
