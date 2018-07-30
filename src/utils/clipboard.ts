import * as copy from 'copy-to-clipboard';
import { showPlainToast } from './toaster';

export const handleCopy = (copyText: string, toastText: string) => () => {
  copy(copyText);
  showPlainToast(toastText);
};
