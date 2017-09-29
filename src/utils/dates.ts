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
