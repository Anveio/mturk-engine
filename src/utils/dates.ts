import * as moment from 'moment';
import { List } from 'immutable';
import {
  LEGACY_DATE_FORMAT,
  WORKER_DATE_FORMAT,
  DATE_FORMAT,
  MOMENT_LOCALE,
  HHMMSS_FORMAT,
  CONTACT_DATE_FORMAT
} from '../constants/dates';
import { range } from './arrays';
import { LegacyDateFormat, WorkerDateFormat } from 'types';
import { TimeUnit } from 'constants/enums';

export const dateObjectTo = (date: Date) => (format: DATE_FORMAT) =>
  moment(date).format(format);

export const stringToDate = (dateString: string) => (format: DATE_FORMAT) =>
  moment(dateString, format).toDate();

export const workerDateFormatToLegacyDateFormat = (
  dateString: WorkerDateFormat
): LegacyDateFormat =>
  moment(dateString, WORKER_DATE_FORMAT).format(LEGACY_DATE_FORMAT);

export const legacyDateFormatToContactDateFormat = (dateString: string) =>
  moment(dateString, LEGACY_DATE_FORMAT).format(CONTACT_DATE_FORMAT);

// returns a new date shifted a certain number of days (can be negative)
export const shiftDate = (date: Date, numDays: number) => {
  return moment(date)
    .add(numDays, TimeUnit.DAYS)
    .toDate();
};

export const shiftDateString = (dateString: string, numDays: number) => {
  return moment(dateString, LEGACY_DATE_FORMAT)
    .subtract(numDays, TimeUnit.DAYS)
    .format(LEGACY_DATE_FORMAT);
};

export const todayFormatted = (): string => moment().format(LEGACY_DATE_FORMAT);

export const dateStringToLocaleDateString = (dateString: string): string =>
  moment(dateString, LEGACY_DATE_FORMAT).format(MOMENT_LOCALE);

export const generateOneYearOfDates = (startDate: Date) => {
  const startMoment = moment(startDate);
  return dateRange(startMoment, 365 + startMoment.day());
};

export const dateRange = (
  startDate: moment.Moment,
  numDays = 365
): List<string> =>
  range(numDays).reduce(
    (acc: List<LegacyDateFormat>, cur: number) =>
      acc.unshift(
        startDate
          .clone()
          .subtract(cur, TimeUnit.DAYS)
          .format(LEGACY_DATE_FORMAT)
      ),
    List()
  );

export const isOlderThan = (date: Date, daysBefore: number, start: Date) => {
  const daysBeforeNow = moment(start).subtract(daysBefore, TimeUnit.DAYS);
  return moment(date).isBefore(daysBeforeNow);
};

export const isYoungerThan = (
  date: Date,
  timeBeforeInSeconds: number,
  start: Date
) =>
  moment(date).isAfter(
    moment(start).subtract(timeBeforeInSeconds, TimeUnit.SECONDS)
  );

export const secondsToMinutes = (numSeconds: number): number =>
  Math.floor(numSeconds / 60);

export const displaySecondsAsHHMMSS = (numSeconds: number): string =>
  moment.utc(numSeconds * 1000).format(HHMMSS_FORMAT);

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
