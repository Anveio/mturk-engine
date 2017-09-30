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
