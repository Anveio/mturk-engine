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
  title: parseHitTitle(input),
  requester: parseRequesterName(input),
  requesterId: parseRequesterId(input),
  reward: parseHitReward(input),
  description: parseHitDescription(input),
  groupId: parseGroupId(input),
  pandaLink: '',
  previewLink: ''
});

export const parseHitTitle = (input: HTMLTableElement): string => {
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

export const parseHitReward = (input: HTMLTableElement): string => {
  const hitRewardElem = input.querySelector('span.reward');
  if (hitRewardElem && hitRewardElem.textContent) {
    return hitRewardElem.textContent;
  } else {
    return '[Error retrieving HIT reward amount]';
  }
};

export const parseGroupId = (input: HTMLTableElement): string => {
  const groupIdElem = input.querySelector('a[href*="groupId="]');
  if (groupIdElem) {
    const href = groupIdElem.getAttribute('href') as string;
    return href.split('=')[1];
  } else if (input.querySelector('a[href*="requestqualification?"]')) {
    return '[You are not qualified]';
  } else {
    return '[Error retrieving HIT Group ID]';
  }
};

export const parseHitPage = (html: string): HitTableEntry[] => {
  const table = stringToDomElement(html);
  const hitContainers = selectHitContainers(table);
  const hitData = tabulateData(hitContainers);
  return hitData;
};
