import { statusDate } from '../constants/querySelectors';

/**
 * Returns an array of Mturk's URL encoded date strings for each day that has
 * HIT data.
 * @param html 
 */
export const parseStatusSummaryPage = (html: Document): string[] => {
  const dateCells = html.querySelectorAll(statusDate);
  if (dateCells) {
    const unfilteredDates = Array.from(dateCells).map(
      (date: HTMLTableDataCellElement) => parseEncodedDateString(date),
      []
    );

    return unfilteredDates.filter((el: string) => el !== '');
  } else {
    return [];
  }
};

const parseEncodedDateString = (input: HTMLTableDataCellElement): string => {
  const anchorElem = input.querySelector('a');
  if (anchorElem && anchorElem.getAttribute('href')) {
    return (anchorElem.getAttribute('href') as string).split('encodedDate=')[1];
  } else {
    return '';
  }
};
