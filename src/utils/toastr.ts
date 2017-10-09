import { toastr } from 'react-redux-toastr';
import { dateStringToLocaleDateString } from './dates';

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
