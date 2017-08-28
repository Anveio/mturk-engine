import { SearchItem, SearchResults, QueueItem, QueueMap } from '../types';
import {
  hitTableIdentifier,
  requesterIdAnchor,
  groupIdAnchor,
  hitIdAnchor,
  timeLeftSelector,
  timeAllotedSelector
} from '../constants';
import { Map } from 'immutable';
import { v4 } from 'uuid';

/**
 * Parses an HTML string into a table element.
 * @param htmlString 
 */
export const stringToDomElement = (htmlString: string): HTMLDivElement => {
  const el = document.createElement('div');
  el.innerHTML = htmlString;
  return el;
};

export const selectHitContainers = (el: HTMLDivElement): HTMLDivElement[] =>
  Array.from(el.querySelectorAll(hitTableIdentifier) as NodeListOf<
    HTMLDivElement
  >);

export const tabulateSearchData = (input: HTMLDivElement[]): SearchResults =>
  input.reduce(
    (map: SearchResults, hit: HTMLDivElement) =>
      map.set(parseGroupId(hit), createSearchItem(hit)),
    Map<string, SearchItem>()
  );

export const createSearchItem = (input: HTMLDivElement): SearchItem => ({
  title: parseTitle(input),
  requesterName: parseRequesterName(input),
  requesterId: parseRequesterId(input),
  reward: parseReward(input),
  groupId: parseGroupId(input),
  time: Date.now(),
  timeAllotted: parseTimeAllotted(input),
  batchSize: parseBatchSize(input),
  qualified: parseQualified(input)
});

export const parseTitle = (input: HTMLDivElement): string => {
  const hitTitleElem = input.querySelector('a.capsulelink');
  return hitTitleElem && hitTitleElem.textContent
    ? hitTitleElem.textContent.trim()
    : '[Error:title]';
};

export const parseRequesterName = (input: HTMLDivElement): string => {
  const requesterNameElem = input.querySelector('span.requesterIdentity');
  return requesterNameElem && requesterNameElem.textContent
    ? requesterNameElem.textContent
    : '[Error:requesterName]';
};

export const parseRequesterId = (input: HTMLDivElement): string => {
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

export const parseReward = (input: HTMLDivElement): string => {
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
export const parseGroupId = (input: HTMLDivElement): string => {
  // const groupIdElem = input.querySelector('a[href*="groupId="]');
  const groupIdElem = input.querySelector(groupIdAnchor);
  if (groupIdElem) {
    const href = groupIdElem.getAttribute('href') as string;
    return href.split('=')[1];
  } else {
    return '[Error:groupId]-' + v4();
  }
};

export const parseTimeAllotted = (input: HTMLDivElement): string => {
  const timeAllotedElem = input.querySelector(timeAllotedSelector);
  return timeAllotedElem && timeAllotedElem.textContent
    ? timeAllotedElem.textContent.trim()
    : '[Error:reward]';
};

/**
 * Parses the number of HITs available. Returns a default value of 1 if parsing fails.
 * @param input 
 */
export const parseBatchSize = (input: HTMLDivElement): number => {
  const batchSizeElem = input.querySelectorAll('td.capsule_field_text')[4];
  if (batchSizeElem && batchSizeElem.textContent) {
    return parseInt(batchSizeElem.textContent, 10);
  } else {
    return 1;
  }
};

export const parseQualified = (input: HTMLDivElement): boolean => {
  return !input.querySelector('a[href^="/mturk/requestqualification?"]');
};

export const parseSearchPage = (html: string): SearchResults => {
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

export const parseHitIdQueue = (input: HTMLDivElement): string => {
  const hitIdElem = input.querySelector(hitIdAnchor);
  if (hitIdElem) {
    const href = hitIdElem.getAttribute('href') as string;
    return href.split('=')[1];
  } else {
    return '[Error:groupId]-' + v4();
  }
};

export const parseTimeLeft = (input: HTMLDivElement): string => {
  const timeLeftElem = input.querySelector(timeLeftSelector);
  if (timeLeftElem) {
    return (timeLeftElem as HTMLTableCellElement).innerText.trim();
  } else {
    return '[Error:timeLeft]';
  }
};

export const createQueueItem = (input: HTMLDivElement): QueueItem => ({
  title: parseTitle(input),
  hitId: parseHitIdQueue(input),
  requesterName: parseRequesterName(input),
  reward: parseReward(input),
  timeLeft: parseTimeLeft(input)
});

export const tabulateQueueData = (input: HTMLDivElement[]): QueueMap =>
  input.reduce(
    (map: QueueMap, hit: HTMLDivElement) =>
      map.set(parseHitIdQueue(hit), createQueueItem(hit)),
    Map<string, QueueItem>()
  );

export const findHitForm = (input: HTMLDivElement) => {
  return input.querySelector('form[action="/mturk/submit"]');
};

export const validateHitAccept = (html: string): boolean => {
  const table = stringToDomElement(html);
  return !!findHitForm(table);
};
