import { Toaster, Position } from '@blueprintjs/core';
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
