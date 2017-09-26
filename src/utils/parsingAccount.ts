import { workerIdSelector
} from '../constants/querySelectors';

export const parseRequesterId = (input: HTMLDivElement): string => {
  const workerIDElem = input.querySelector(workerIdSelector);
  if (workerIDElem) {
    const href = workerIDElem.getAttribute('href') as string;
    /**
     * Credit to: L708 in https://greasyfork.org/en/scripts/21815-hit-finder-beta/code#n708
     */
    return href.split('requesterId=')[1];
  } else {
    return '[Error:requesterId]';
  }
};