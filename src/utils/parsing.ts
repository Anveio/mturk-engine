import { Hit, HitMap } from '../types';
import { hitTableIdentifier, requesterIdAnchor, groupIdAnchor } from '../constants';
import { Map } from 'immutable';
import { v4 } from 'uuid';

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
  Array.from(el.querySelectorAll(hitTableIdentifier) as NodeListOf<
    HTMLTableElement
  >);

export const tabulateData = (input: HTMLTableElement[]): HitMap =>
  input.reduce(
    (map: HitMap, hit: HTMLTableElement) =>
      map.set(parseGroupId(hit), generateHitData(hit)),
    Map<string, Hit>()
  );

export const generateHitData = (input: HTMLTableElement): Hit => ({
  title: parseHitTitle(input),
  requesterName: parseRequesterName(input),
  requesterId: parseRequesterId(input),
  reward: parseHitReward(input),
  groupId: parseGroupId(input),
  time: Date.now(),
  batchSize: parseBatchSize(input)
});

export const parseHitTitle = (input: HTMLTableElement): string => {
  const hitTitleElem = input.querySelector('a.capsulelink');
  return hitTitleElem && hitTitleElem.textContent
    ? hitTitleElem.textContent.trim()
    : '[Error:title]';
};

export const parseRequesterName = (input: HTMLTableElement): string => {
  const requesterNameElem = input.querySelector('span.requesterIdentity');
  return requesterNameElem && requesterNameElem.textContent
    ? requesterNameElem.textContent
    : '[Error:requesterName]';
};

export const parseRequesterId = (input: HTMLTableElement): string => {
  const requesterIdElem = input.querySelector(requesterIdAnchor);
  if (requesterIdElem) {
    const href = requesterIdElem.getAttribute('href') as string;
    /**
     * Credit to: L708 in https://greasyfork.org/en/scripts/21815-hit-finder-beta/code#n708
     */
    return href.split('requesterId=')[1];
  } else {
    return '[Error:requesterId]';
  }
};

export const parseHitReward = (input: HTMLTableElement): string => {
  const hitRewardElem = input.querySelector('span.reward');
  return hitRewardElem && hitRewardElem.textContent
    ? hitRewardElem.textContent.replace('$', '')
    : '[Error:reward]';
};

/**
 * Fetches the groupId of a Hit. If one cannot be found. return a string that 
 * starts with '[Error:groupId]-' then appends a v4 uuid so that it can be uniquely
 * indexed in the HitMap.
 * @param input 
 */
export const parseGroupId = (input: HTMLTableElement): string => {
  // const groupIdElem = input.querySelector('a[href*="groupId="]');
  const groupIdElem = input.querySelector(groupIdAnchor);
  if (groupIdElem) {
    const href = groupIdElem.getAttribute('href') as string;
    return href.split('=')[1];
  } else {
    return '[Error:groupId]-' + v4();
  }
};

/**
 * Parses the number of HITs available. Returns a default value of 1 if parsing fails.
 * @param input 
 */
export const parseBatchSize = (input: HTMLTableElement): number => {
  const batchSizeElem = input.querySelectorAll('td.capsule_field_text')[4];
  if (batchSizeElem && batchSizeElem.textContent) {
    return parseInt(batchSizeElem.textContent, 10);
  } else {
    return 1;
  }
};

export const parseHitPage = (html: string): HitMap => {
  const table = stringToDomElement(html);
  const hitContainers = selectHitContainers(table);
  const hitData = tabulateData(hitContainers);
  return hitData;
};
