import { List } from 'immutable';

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

export const flattenDate = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate;
};

export const dateRange = (startDate: Date, numDays = 365): List<Date> =>
  Array.from(Array(numDays).keys()).reduce(
    (acc: List<Date>, index: number) => acc.push(shiftDate(startDate, index)),
    List()
  );

export const convertToDateString = (date: Date): string => {
  const day = padTwoDigits(date.getDay());
  const month = padTwoDigits(date.getMonth());
  const year = date.getFullYear().toString();
  return year + month + day;
};
