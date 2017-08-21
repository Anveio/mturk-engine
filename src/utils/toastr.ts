import { toastr } from 'react-redux-toastr';
import { truncate } from './formatting';
import { HitReturnStatus } from './returnHit';

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
  toastr.success(
    'Success!',
    `Hit: "${truncate(title, 10)}" was added to your queue. `
  );
};

const failedAcceptToast = (title: string) => {
  toastr.warning(
    `Problem enqueing hit.`,
    `You may not be qualified, or no HITs may be available, or you may need to solve a CAPTCHA.`,
    { timeOut: 5000 }
  );
};

const successfulQueueToast = () => {
  toastr.success('Refreshed queue', `${new Date().toLocaleTimeString()}`);
};

export const failedQueueToast = () => {
  toastr.warning('Error', `There was a problem refreshing your queue.`);
};

const emptyQueueToast = () => {
  toastr.info('Your queue is empty.', `${new Date().toLocaleTimeString()}`);
};

const successfulSearchToast = () => {
  toastr.success(`Search successful`, `${new Date().toLocaleTimeString()}`);
};

const failedSearchToast = () => {
  toastr.error(
    `Error`,
    `Your search returned no results. Check your search settings and make sure you're logged in.`
  );
};

const repeatReturnToast = () => {
  toastr.light('Couldn\'t return HIT', 'You\'ve already returned this HIT.');
};

const successfulReturnToast = () => {
  toastr.success('Return successful.', 'A HIT has been removed from your queue.');
};

export const errorReturnToast = () => {
  toastr.error(
    'Problem returning HIT.',
    'The error was probably on our end and that HIT is likely no longer in your queue.'
  );
};
