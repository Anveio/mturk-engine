import { toastr } from 'react-redux-toastr';
import { truncate } from './formatting';

export const generateAcceptHitToast = (successful: boolean, title: string) => {
  successful ? successfulAcceptToast(title) : failedAcceptToast(title);
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
