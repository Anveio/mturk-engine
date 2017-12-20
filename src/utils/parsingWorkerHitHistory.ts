import { workerHitHistoryDateAnchor } from '../constants/querySelectors';

/**
 * Returns an array of Mturk's URL encoded date strings for each day that has
 * HIT data.
 * @param html
 */
export const parseWorkerHitHistory = (html: Document): string[] => {
  const dateCells = html.querySelectorAll(workerHitHistoryDateAnchor);
  const unfilteredDates = Array.from(dateCells).map((date: Element) =>
    parseEncodedDateString(date)
  );

  return unfilteredDates.filter(el => el !== '');
};

/**
 * Returns a date string in the format of YYYY-MM-DD
 * @param input
 */
const parseEncodedDateString = (input: Element): string => {
  const href = input.getAttribute('href');
  if (href && href.split('/status_details/').length > 1) {
    return href.split('/status_details/')[1];
  } else {
    console.warn(`Error parsing date string for ${input}, href: ${href}`);
    return '';
  }
};
