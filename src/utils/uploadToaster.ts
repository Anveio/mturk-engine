import { TopRightToaster } from '../index';
import { UploadProgressToast } from '../components/Toasts';
import { IToastProps } from '@blueprintjs/core';

export const createProgressToast = () => TopRightToaster.show(renderProgress());

export const updateProgressToast = (key: string, progress: number) =>
  TopRightToaster.update(key, renderProgress(progress));

const renderProgress = (progress = 0): IToastProps => ({
  message: UploadProgressToast({ progress }),
  timeout: progress < 100 ? 0 : 2000
});
