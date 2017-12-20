import * as moment from 'moment';
import { List } from 'immutable';
import {
  LEGACY_DATE_FORMAT,
  WORKER_DATE_FORMAT,
  MOMENT_LOCALE
} from '../constants/misc';
import { range } from './arrays';

/**
 * Worker's date URL's are in YYYY-MM-DD, but the HIT database stores them in
 * MMDDYYYY format.
 * @param dateString
 */
export const workerDateStringToLegacyDateString = (dateString: string) =>
  moment(dateString, WORKER_DATE_FORMAT).format(LEGACY_DATE_FORMAT);

export const legacyDateStringToWorkerDateString = (dateString: string) =>
  moment(dateString, LEGACY_DATE_FORMAT).format(WORKER_DATE_FORMAT);

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
