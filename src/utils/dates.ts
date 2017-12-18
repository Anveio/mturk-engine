import * as moment from 'moment';
import { List } from 'immutable';
import { DATE_FORMAT, MOMENT_LOCALE } from '../constants/misc';
import { range } from './arrays';

/**
 * Expects a string in MTurk's URL encoded date format
 * (e.g. '09262017' would be converted into a Date object for
 * September 26th, 2017)
 * @param encodedDate string in described format
 */
export const encodedDateStringToDate = (encodedDate: string): Date => {
  return moment(encodedDate, DATE_FORMAT).toDate();
};

/**
 * Converts Date objects to MTurk formatted date strings.
 * (e.g. Date object for September 26th, 2017 would be converted to '09262017')
 * @param date
 */
export const dateToEncodedDateString = (date: Date): string =>
  moment(date).format(DATE_FORMAT);

// returns a new date shifted a certain number of days (can be negative)
export const shiftDate = (date: Date, numDays: number) => {
  return moment(date)
    .add(numDays, 'days')
    .toDate();
};

export const shiftDateString = (dateString: string, numDays: number) => {
  return moment(dateString, DATE_FORMAT)
    .subtract(numDays, 'days')
    .format(DATE_FORMAT);
};

export const todayFormatted = (): string => moment().format(DATE_FORMAT);

export const dateStringToLocaleDateString = (dateString: string): string =>
  moment(dateString, DATE_FORMAT).format(MOMENT_LOCALE);

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
          .format(DATE_FORMAT)
      ),
    List()
  );

export const secondsToMinutes = (numSeconds: number): number =>
  Math.floor(numSeconds / 60);

export const displaySecondsAsHHMMSS = (numSeconds: number): string =>
  moment.utc(numSeconds * 1000).format('HH:mm:ss');