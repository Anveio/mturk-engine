import { toastr } from 'react-redux-toastr';
import { truncate } from './formatting';

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
    'Error',
    `There was a problem adding "${truncate(title, 10)} to your queue.`
  );
};

const successfulQueueToast = () => {
  toastr.success('Refreshed queue', `${new Date().toLocaleTimeString()}`);
};

export const failedQueueToast = () => {
  toastr.warning('Error', `There was a problem refreshing your queue.`);
};

const emptyQueueToast = () => {
  toastr.info(
    'Your queue is empty.',
    `Accept some HITs first and try again.`
  );
};
