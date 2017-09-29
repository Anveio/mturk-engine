import { statusDate } from '../constants/querySelectors';
import { List } from 'immutable';

/**
 * Returns a list of Mturk's URL encoded date strings for each day that has
 * HIT data.
 * @param html 
 */
export const parseStatusPage = (html: Document): List<string> => {
  const dateCells = html.querySelectorAll(statusDate);
  if (dateCells) {
    const unfilteredDates = Array.from(dateCells).reduce(
      (listOfDates: List<string>, date: HTMLTableDataCellElement) =>
        listOfDates.push(parseEncodedDateString(date)),
      List()
    );

    return unfilteredDates.filter((el: string) => el !== '') as List<string>;
  } else {
    return List();
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
