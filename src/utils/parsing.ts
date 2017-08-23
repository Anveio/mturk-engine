import { SearchItem, SearchMap, QueueItem, QueueMap } from '../types';
import {
  hitTableIdentifier,
  requesterIdAnchor,
  groupIdAnchor,
  hitIdAnchor
} from '../constants';
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

export const selectHitContainers = (el: HTMLTableElement): HTMLTableElement[] =>
  Array.from(el.querySelectorAll(hitTableIdentifier) as NodeListOf<
    HTMLTableElement
  >);

export const tabulateSearchData = (input: HTMLTableElement[]): SearchMap =>
  input.reduce(
    (map: SearchMap, hit: HTMLTableElement) =>
      map.set(parseGroupId(hit), createSearchItem(hit)),
    Map<string, SearchItem>()
  );

export const createSearchItem = (input: HTMLTableElement): SearchItem => ({
  title: parseTitle(input),
  requesterName: parseRequesterName(input),
  requesterId: parseRequesterId(input),
  reward: parseReward(input),
  groupId: parseGroupId(input),
  time: Date.now(),
  batchSize: parseBatchSize(input),
  qualified: parseQualified(input)
});

export const parseTitle = (input: HTMLTableElement): string => {
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

export const parseReward = (input: HTMLTableElement): string => {
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

export const parseQualified = (input: HTMLTableElement): boolean => {
  return !input.querySelector('a[href^="/mturk/requestqualification?"]');
};

export const parseSearchPage = (html: string): SearchMap => {
  const table = stringToDomElement(html);
  const hitContainers = selectHitContainers(table);
  const hitData = tabulateSearchData(hitContainers);
  return hitData;
};

export const parseQueuePage = (html: string): QueueMap => {
  const table = stringToDomElement(html);
  const hitContainers = selectHitContainers(table);
  const hitData = tabulateQueueData(hitContainers);
  return hitData;
};

export const parseHitIdQueue = (input: HTMLTableElement): string => {
  const hitIdElem = input.querySelector(hitIdAnchor);
  if (hitIdElem) {
    const href = hitIdElem.getAttribute('href') as string;
    return href.split('=')[1];
  } else {
    return '[Error:groupId]-' + v4();
  }
};

export const createQueueItem = (input: HTMLTableElement): QueueItem => ({
  title: parseTitle(input),
  hitId: parseHitIdQueue(input),
  requesterName: parseRequesterName(input),
  reward: parseReward(input)
});

export const tabulateQueueData = (input: HTMLTableElement[]): QueueMap =>
  input.reduce(
    (map: QueueMap, hit: HTMLTableElement) =>
      map.set(parseHitIdQueue(hit), createQueueItem(hit)),
    Map<string, QueueItem>()
  );

export const findHitForm = (input: HTMLTableElement) => {
  return input.querySelector('form[action="/mturk/submit"]');
};

export const validateHitAccept = (html: string): boolean => {
  const table = stringToDomElement(html);
  return !!findHitForm(table);
};
