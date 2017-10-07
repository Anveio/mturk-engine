import { toastr } from 'react-redux-toastr';
import { SearchResult } from '../types';
import { truncate } from './formatting';
import { HitReturnStatus } from '../api/returnHit';
import { dateStringToLocaleDateString } from './dates';

export const generateSearchToast = (successful: boolean) => {
  successful ? successfulSearchToast() : failedSearchToast();
};

export const generateAcceptHitToast = (successful: boolean, title: string) => {
  successful ? successfulAcceptToast(title) : failedAcceptToast(title);
};

export const generateQueueToast = (notEmpty: boolean) => {
  notEmpty ? successfulQueueToast() : emptyQueueToast();
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

const successfulAcceptToast = (title: string) => {
  title.startsWith('[Refresh Required]')
    ? toastr.success('Success!', 'A HIT was added to your queue.')
    : toastr.success(
        'Success!',
        `${truncate(title, 45)} was added to your queue. `
      );
};

const failedAcceptToast = (title: string) => {
  title.startsWith('[Refresh Required]')
    ? toastr.warning(
        `That HIT was not added to your queue.`,
        `You may not be qualified, or no HITs may be available, or you may need to solve a CAPTCHA.`
      )
    : toastr.warning(
        `${truncate(title, 45)} was not added to your queue.`,
        `You may not be qualified, or no HITs may be available, or you may need to solve a CAPTCHA.`
      );
};

const successfulQueueToast = () => {
  toastr.success('Refreshed queue', new Date().toLocaleTimeString());
};

export const failedQueueToast = () => {
  toastr.warning('Error', `There was a problem refreshing your queue.`);
};

const emptyQueueToast = () => {
  toastr.info('Your queue is empty.', new Date().toLocaleTimeString());
};

const successfulSearchToast = () => {
  toastr.success(`Search successful`, new Date().toLocaleTimeString());
};

const failedSearchToast = () => {
  toastr.error(
    `Error`,
    `Your search returned no results. Make sure you're logged in and check your search settings.`,
    { timeOut: 3000 }
  );
};

const repeatReturnToast = () => {
  // tslint:disable:quotemark
  toastr.light(
    "You've already returned this HIT.",
    "It's been removed from your queue."
  );
};

const successfulReturnToast = () => {
  toastr.success(
    'Return successful.',
    'A HIT has been removed from your queue.'
  );
};

export const errorReturnToast = () => {
  toastr.error(
    'Problem returning HIT.',
    'The error was probably on our end and that HIT is likely no longer in your queue.'
  );
};

export const addWatcherToast = (hit: SearchResult) => {
  toastr.info('Watcher added', `Look for ${hit.title} in the watchers tab.`);
};

export const copyMarkdownToast = (hit: SearchResult) => {
  toastr.light(
    'Copied to clipboard',
    `${hit.title}'s markdown was added to your clipboard.`
  );
};

export const accountConnectionFailedToast = () => {
  toastr.error(
    'Problem connecting your account',
    `Connecting your account only works if you're currently logged into MTurk. 
    Log in through the actual site and try again.`,
    { timeOut: 5000 }
  );
};

export const emptySummaryPageToast = () => {
  toastr.error(
    'Problem getting your recent HITs',
    "Make sure you're logged in and have done a HIT in the past 45 days and try again.",
    { timeOut: 5000 }
  );
};

export const statusDetailToast = (dateStr: string, noDataFound: boolean) => {
  const toastHeader =
    'Refreshed HITs for the day of ' + dateStringToLocaleDateString(dateStr);

  noDataFound
    ? toastr.info(toastHeader, 'No activity was found for this day.', {
        timeOut: 3000
      })
    : toastr.success(
        toastHeader,
        'Your database has been updated with any new information.',
        { timeOut: 5000 }
      );
};

export const statusDetailErrorToast = (dateStr: string) =>
  toastr.error(
    'Problem getting data for ' + dateStringToLocaleDateString(dateStr),
    'This is most likely because you have been logged out of MTurk. Try logging in again.',
    { timeOut: 5000 }
  );
