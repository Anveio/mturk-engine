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
  const parseableDateString =
    encodedDate.slice(0, 2) +
    ' ' +
    encodedDate.slice(2, 4) +
    ' ' +
    encodedDate.slice(4);

  return new Date(Date.parse(parseableDateString));
};

/**
 * Converts Date objects to MTurk formatted date strings.
 * (e.g. Date object for September 26th, 2017 would be converted to '09262017')
 * @param date 
 */
export const dateToEncodedDateString = (date: Date): string => {
  const day = padTwoDigits(date.getDay());
  const month = padTwoDigits(date.getMonth());
  const year = date.getFullYear().toString();
  return month + day + year;
};

const padTwoDigits = (num: number): string => {
  return num < 10 ? '0' + num.toString() : num.toString();
};

export const convertToDate = (obj: Date | string) =>
  obj instanceof Date ? obj : new Date(obj);

// returns a new date shifted a certain number of days (can be negative)
export const shiftDate = (date: Date, numDays: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);

  return flattenDate(newDate);
};

export const shiftDateString = (dateString: string, numDays: number) => {
  // console.log(
  //   moment(dateString, DATE_FORMAT).subtract(numDays, 'days').format(DATE_FORMAT)
  // );
  return moment(dateString, DATE_FORMAT)
    .subtract(numDays, 'days')
    .format(DATE_FORMAT);
};

export const flattenDate = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate;
};

export const dateRange = (startDate: string, numDays = 365): List<string> =>
  range(numDays).reduce(
    (acc: List<string>, cur: number) =>
      acc.unshift(shiftDateString(startDate, cur)),
    List()
  );

export const convertToDateString = (date: Date): string => {
  const day = padTwoDigits(date.getDay());
  const month = padTwoDigits(date.getMonth());
  const year = date.getFullYear().toString();
  return month + day + year;
};

export const todayFormatted = (): string => moment().format(DATE_FORMAT);

export const dateStringToLocaleDateString = (dateString: string): string =>
  moment(dateString, DATE_FORMAT).format(MOMENT_LOCALE);
