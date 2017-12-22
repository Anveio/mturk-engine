import * as moment from 'moment';
import { List } from 'immutable';
import {
  LEGACY_DATE_FORMAT,
  WORKER_DATE_FORMAT,
  MOMENT_LOCALE
} from '../constants/misc';
import { range } from './arrays';

/**
 * Worker's date URL's are in YYYY-MM-DD
 * @param dateString
 */
export const dateObjectToWorkerDateFormat = (date: Date) =>
  moment(date).format(WORKER_DATE_FORMAT);

export const legacyDateStringToDate = (dateString: string) =>
  moment(dateString, LEGACY_DATE_FORMAT).toDate();

// returns a new date shifted a certain number of days (can be negative)
export const shiftDate = (date: Date, numDays: number) => {
  return moment(date)
    .add(numDays, 'days')
    .toDate();
};

export const shiftDateString = (dateString: string, numDays: number) => {
  return moment(dateString, LEGACY_DATE_FORMAT)
    .subtract(numDays, 'days')
    .format(LEGACY_DATE_FORMAT);
};

export const todayFormatted = (): string => moment().format(LEGACY_DATE_FORMAT);

export const dateStringToLocaleDateString = (dateString: string): string =>
  moment(dateString, LEGACY_DATE_FORMAT).format(MOMENT_LOCALE);

export const generateOneYearOfDates = () => {
  const startDate = moment();
  return dateRange(startDate, 365 + startDate.day());
};

export const dateRange = (
  startDate: moment.Moment,
  numDays = 365
): List<string> =>
  range(numDays).reduce(
    (acc: List<string>, cur: number) =>
      acc.unshift(
        startDate
          .clone()
          .subtract(cur, 'days')
          .format(LEGACY_DATE_FORMAT)
      ),
    List()
  );

export const secondsToMinutes = (numSeconds: number): number =>
  Math.floor(numSeconds / 60);

export const displaySecondsAsHHMMSS = (numSeconds: number): string =>
  moment.utc(numSeconds * 1000).format('HH:mm:ss');

/**
 * Takes a delay (in seconds), and returns the Date number that many seconds ahead.
 * Returns a default value of 10 seconds ahead if valueOf the created Date is NaN.
 * @param delay
 */
export const calculateTimeFromDelay = (delay: number): Date => {
  const nextSearch = new Date(Date.now() + delay * 1000);
  return Number.isNaN(nextSearch.valueOf())
    ? new Date(Date.now() + 10000)
    : nextSearch;
};
