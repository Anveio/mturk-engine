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
