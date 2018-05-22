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
import { Duration } from 'constants/enums';

export type DurationUnit = moment.DurationInputArg2;

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

export const legacyDateFormatToDateObj = (dateStr: LegacyDateFormat): Date =>
  moment(dateStr, LEGACY_DATE_FORMAT).toDate();

// returns a new date shifted a certain number of days (can be negative)
export const shiftDate = (date: Date, numDays: number) => {
  return moment(date)
    .add(numDays, Duration.DAYS)
    .toDate();
};

export const shiftDateString = (dateString: string, numDays: number) => {
  return moment(dateString, LEGACY_DATE_FORMAT)
    .subtract(numDays, Duration.DAYS)
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
): List<LegacyDateFormat> =>
  range(numDays)
    .reduce(
      (acc: List<LegacyDateFormat>, cur: number) =>
        acc.push(
          startDate
            .clone()
            .subtract(cur, Duration.DAYS)
            .format(LEGACY_DATE_FORMAT)
        ),
      List()
    )
    .reverse() as List<LegacyDateFormat>;

export interface DateComparatorFunction {
  (
    date: Date,
    timeBefore: number,
    start: Date,
    unit: moment.DurationInputArg2
  ): boolean;
}

export const olderThan: DateComparatorFunction = (
  date,
  timeBefore,
  start,
  unit
) => {
  const daysBeforeNow = moment(start).subtract(timeBefore, unit);
  return moment(date).isBefore(daysBeforeNow);
};

export const youngerThan: DateComparatorFunction = (
  date,
  timeBefore,
  start,
  unit
) => moment(date).isAfter(moment(start).subtract(timeBefore, unit));

export const secondsToMinutes = (numSeconds: number): number =>
  Math.floor(numSeconds / 60);

export const formatSecondsAsHhMmSs = (numSeconds: number): string =>
  moment.utc(numSeconds * 1000).format(HHMMSS_FORMAT);

/**
 * Takes a delay (in seconds), and returns the Date number that many seconds ahead.
 * Returns a default value of 10 seconds ahead if valueOf the created Date is NaN.
 * @param delay
 */
export const calculateDateAfterDelay = (now: number, delay: number): Date => {
  const timeAfterDelay = new Date(now + delay * 1000);
  return Number.isNaN(timeAfterDelay.valueOf())
    ? new Date(now + 10000)
    : timeAfterDelay;
};
