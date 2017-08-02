import {
  hitIdentifier,
  requesterIdAnchorString
  // hitDescriptionString
} from '../constants';

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
  input.map(generateHitData);

export const generateHitData = (input: HTMLTableElement): HitTableEntry => ({
  title: parseHitTitleeas(input),
  requester: parseRequesterName(input),
  requesterId: parseRequesterId(input),
  reward: 1,
  description: parseHitDescription(input),
  groupId: '',
  pandaLink: '',
  previewLink: ''
});

export const parseHitTitleeas = (input: HTMLTableElement): string => {
  const hitTitleElem = input.querySelector('a.capsulelink');
  if (hitTitleElem && hitTitleElem.textContent) {
    return hitTitleElem.textContent;
  } else {
    return '[Error retrieving hit title]';
  }
};

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
    const href = requesterIdElem.getAttribute('href') as string;
    /**
     * Credit to: L708 in https://greasyfork.org/en/scripts/21815-hit-finder-beta/code#n708
     */
    return href.split('requesterId=')[1];
  } else {
    return '[Error retrieving requester ID]';
  }
};

export const parseHitDescription = (input: HTMLTableElement): string => {
  const hitTitleElem = input.querySelector('a.capsulelink');
  if (hitTitleElem && hitTitleElem.textContent) {
    return hitTitleElem.textContent;
  } else {
    return '[Error retrieving HIT name]';
  }
};

// export const generate

export const parseHitPage = (html: string): HitTableEntry[] => {
  const table = stringToDomElement(html);
  const hitContainers = selectHitContainers(table);
  const hitData = tabulateData(hitContainers);
  return hitData;
};
