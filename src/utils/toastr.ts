import { toastr } from 'react-redux-toastr';
import { truncate } from './formatting';

export const generateSearchToast = (successful: boolean) => {
  successful ? successfulSearchToast() : failedSearchToast();
};

export const generateAcceptHitToast = (successful: boolean, title: string) => {
  successful ? successfulAcceptToast(title) : failedAcceptToast(title);
};

export const generateQueueToast = (notEmpty: boolean) => {
  notEmpty ? successfulQueueToast() : emptyQueueToast();
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
