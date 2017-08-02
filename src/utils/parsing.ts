import { hitIdentifier, requesterIdAnchorString } from '../constants';

/**
 * Parses an HTML string into a table element.
 * @param htmlString 
 */
export const stringToDomElement = (htmlString: string): HTMLTableElement => {
  const el = document.createElement('table');
  el.innerHTML = htmlString;
  return el;
};

/**
 * Accepts a DocumentFragment and returns all divs that are a HIT container.
 * @param dom A DocumentFragment created by stringToDomFragment
 */
export const selectHitContainers = (el: HTMLTableElement): HTMLTableElement[] =>
  Array.from(el.querySelectorAll(hitIdentifier) as NodeListOf<HTMLTableElement>);

export const tabulateData = (input: HTMLTableElement[]): HitTableEntry[] =>
  input.map(el => ({
    requester: parseRequesterName(el),
    requesterId: parseRequesterId(el),
    reward: 1,
    title: 'title'
  }));

export const parseRequesterName = (input: HTMLTableElement): string => {
  const requesterNameElem = input.querySelector('span.requesterIdentity');
  if (requesterNameElem && requesterNameElem.textContent) {
    return requesterNameElem.textContent;
  } else {
    return '[Error retrieving requester name]';
  }
};

export const parseRequesterId = (input: HTMLTableElement): string => {
  const requesterIdElem = input.querySelector(requesterIdAnchorString);
  if (requesterIdElem) {
    /**
     * Credit to: Line 708 in https://greasyfork.org/en/scripts/21815-hit-finder-beta/code#n708
     */
    const href = requesterIdElem.getAttribute('href') as string;
    return href.split('requesterId=')[1];
  } else {
    return '[Error retrieving requester ID]';
  }
};

export const parseHitPage = (html: string): HitTableEntry[] => {
  const table = stringToDomElement(html);
  const hitContainers = selectHitContainers(table);
  const hitData = tabulateData(hitContainers);
  return hitData;
};
