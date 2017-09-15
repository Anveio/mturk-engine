import { SearchResult, SearchResults, QueueItem, QueueMap } from '../types';
import {
  hitContainerTableCell,
  requesterIdAnchor,
  groupIdAnchor,
  hitIdAnchor,
  timeLeftSelector,
  timeAllotedSelector,
  descriptionSelector,
  qualsRequiredSelector
} from '../constants';
import { Map } from 'immutable';
import * as v4 from 'uuid/v4';

export const selectHitContainers = (el: Document): HTMLDivElement[] =>
  Array.from(el.querySelectorAll(hitContainerTableCell) as NodeListOf<
    HTMLDivElement
  >);

export const tabulateSearchData = (input: HTMLDivElement[]): SearchResults =>
  input.reduce((map: SearchResults, hit: HTMLDivElement, index: number) => {
    const groupId = parseGroupId(hit);
    return map.set(groupId, createSearchItem(hit, groupId, index));
  }, Map<string, SearchResult>());

export const createSearchItem = (
  input: HTMLDivElement,
  groupId: string,
  index: number
): SearchResult => ({
  groupId,
  index,
  title: parseTitle(input),
  requester: {
    name: parseRequesterName(input),
    id: parseRequesterId(input)
  },
  reward: parseReward(input),
  timeAllotted: parseTimeAllotted(input),
  description: parseDescription(input),
  batchSize: parseBatchSize(input),
  qualified: parseQualified(input),
  qualsRequired: parseQualsRequired(input)
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

export const parseQualified = (input: HTMLDivElement): boolean =>
  !input.querySelector('a[href^="/mturk/requestqualification?"]');

export const parseQualsRequired = (input: HTMLDivElement): string[] => {
  const qualsRequiredContainer = input.querySelectorAll(qualsRequiredSelector);
  let qualTextArray: string[] = [];

  /**
   * The first child of qualsRequiredChildren will just contain the text 
   * 'Qualifications required', so start at 1 instead of 0.
   */
  for (let i = 1; i < qualsRequiredContainer.length; i++) {
    qualTextArray.push(parseSingleQualification(qualsRequiredContainer[i]));
  }
  return qualTextArray;
};

const parseSingleQualification = (input: Element): string => {
  if (input && input.children) {
    const qualText = input.querySelector('td > div > div');
    if (qualText && qualText.textContent) {
      return qualText.textContent.trim();
    }
  }

  return '[Error:qualification';
};

export const parseSearchPage = (html: Document): SearchResults => {
  const hitContainers = selectHitContainers(html);
  const hitData = tabulateSearchData(hitContainers);
  return hitData;
};

export const parseQueuePage = (html: Document): QueueMap => {
  const hitContainers = selectHitContainers(html);
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

export const parseDescription = (input: HTMLDivElement): string => {
  const descriptionElem = input.querySelector(descriptionSelector);
  if (descriptionElem) {
    return (descriptionElem as HTMLTableDataCellElement).innerText.trim();
  } else {
    return 'No description.';
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

export const findHitForm = (input: Document) => {
  return input.querySelector('form[action="/mturk/submit"]');
};

export const validateHitAccept = (html: Document): boolean => {
  return !!findHitForm(html);
};
