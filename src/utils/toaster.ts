import { Toaster, Position } from '@blueprintjs/core';
import { HitReturnStatus } from '../api/returnHit';
import { truncate } from './formatting';
// tslint:disable:max-line-length

export const TopRightToaster = Toaster.create({
  position: Position.TOP_RIGHT
});

export const copyIdToast = () =>
  TopRightToaster.show({
    message: 'Worker ID copied to clipboard',
    timeout: 2000
  });

export const failedSearchToast = () => {
  TopRightToaster.show({
    message: `Your search returned no results. Make sure you're logged in and check your search settings.`,
    action: {
      href: 'https://www.mturk.com/mturk/beginsignin',
      target: '_blank',
      text: 'Login Page'
    },
    intent: 2,
    timeout: 3000
  });
};

export const generateAcceptHitToast = (successful: boolean, title: string) => {
  successful ? successfulAcceptToast(title) : failedAcceptToast(title);
};

export const generateQueueToast = (notEmpty: boolean) => {
  notEmpty ? successfulQueueToast() : emptyQueueToast();
};

export const failedQueueToast = () => {
  TopRightToaster.show({
    message: 'There was a problem refreshing your queue.',
    intent: 3
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

const successfulAcceptToast = (title: string) => {
  title.startsWith('[Refresh Required]')
    ? TopRightToaster.show({
        message: 'A HIT was added to your queue.',
        intent: 1
      })
    : TopRightToaster.show({
        message: `"${truncate(title, 45)}" was added to your queue.`,
        intent: 1
      });
};

const failedAcceptToast = (title: string) => {
  TopRightToaster.show({
    message: `"${truncate(
      title,
      45
    )}" was not added to your queue. You may not be qualified, or no HITs may be available, or you may need to solve a CAPTCHA.`,
    intent: 2
  });
};

const successfulQueueToast = () => {
  TopRightToaster.show({
    message: 'Refreshed queue on ' + new Date().toLocaleTimeString(),
    intent: 0
  });
};

const emptyQueueToast = () => {
  TopRightToaster.show({
    message: 'Your queue is empty as of ' + new Date().toLocaleTimeString(),
    intent: -1
  });
};

const successfulReturnToast = () => {
  TopRightToaster.show({
    message: 'A HIT has been removed from your queue.',
    intent: 0
  });
};

const errorReturnToast = () => {
  TopRightToaster.show({
    message:
      'Problem returning HIT. The HIT you attempted to return is likely no longer in your queue',
    intent: 2
  });
};

const repeatReturnToast = () => {
  // tslint:disable:quotemark
  TopRightToaster.show({
    message:
      "You've already returned this HIT. It's been removed from your queue.",
    intent: -1
  });
};
