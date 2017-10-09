import { Toaster, Position } from '@blueprintjs/core';

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
      text: 'Login Page',
    },
    intent: 2,
    timeout: 3000
  });
};
