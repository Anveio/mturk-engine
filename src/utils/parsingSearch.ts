import { Map } from 'immutable';
import { SearchResult, SearchResults } from '../types';
import {
  hitTitleSelector,
  hitRequesterNameSelector,
  hitRewardSelector,
  requesterIdAnchor,
  groupIdAnchor,
  descriptionSelector,
  qualsRequiredSelector
} from '../constants/querySelectors';
import {
  selectHitContainers,
  parseStringProperty,
  parseCurrencyProperty
} from './parsing';
import * as v4 from 'uuid/v4';

const tabulateSearchData = (input: HTMLDivElement[]): SearchResults =>
  input.reduce((map: SearchResults, hit: HTMLDivElement, index: number) => {
    const groupId = parseGroupId(hit);
    return map.set(groupId, createSearchItem(hit, groupId, index));
    // tslint:disable-next-line:align
  }, Map<string, SearchResult>());

const createSearchItem = (
  input: HTMLDivElement,
  groupId: string,
  index: number
): SearchResult => ({
  groupId,
  index,
  title: parseStringProperty(hitTitleSelector, 'title')(input),
  requester: {
    name: parseStringProperty(hitRequesterNameSelector, 'requesterName')(input),
    id: parseRequesterId(input)
  },
  reward: parseCurrencyProperty(hitRewardSelector)(input),
  // TODO: Fix this
  timeAllottedInSeconds: 12,
  description: parseStringProperty(descriptionSelector, 'description')(input),
  batchSize: parseBatchSize(input),
  qualified: parseQualified(input),
  qualsRequired: parseQualsRequired(input)
});

const createReadSearchItem = (
  input: HTMLDivElement,
  groupId: string,
  index: number,
  readDate: Date
): SearchResult => ({
  groupId,
  index,
  title: parseStringProperty(hitTitleSelector, 'title')(input),
  requester: {
    name: parseStringProperty(hitRequesterNameSelector, 'requesterName')(input),
    id: parseRequesterId(input)
  },
  reward: parseCurrencyProperty(hitRewardSelector)(input),
  timeAllottedInSeconds: 12,
  description: parseStringProperty(descriptionSelector, 'description')(input),
  batchSize: parseBatchSize(input),
  qualified: parseQualified(input),
  qualsRequired: parseQualsRequired(input),
  markedAsRead: readDate
});

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

/**
 * Fetches the groupId of a Hit. If one cannot be found. assume it's because
 * MTurk is hiding the GroupID due to being unqualified. If a groupID is still
 * not found, return a string that starts with '[Error:groupId]-' then appends
 * a v4 uuid so that it can be uniquely indexed in the HitMap.
 * @param input
 */
const parseGroupId = (input: HTMLDivElement): string => {
  const groupIdElem = input.querySelector(groupIdAnchor);
  if (groupIdElem) {
    const href = groupIdElem.getAttribute('href') as string;
    return href.split('=')[1];
  } else {
    return parseUnqualifiedGroupId(input);
  }
};

const parseUnqualifiedGroupId = (input: HTMLDivElement): string => {
  const groupIdElem = input.querySelector('a[href*="GroupId="]');
  if (groupIdElem) {
    const href = groupIdElem.getAttribute('href') as string;
    return href.split('hitGroupId=')[1];
  } else {
    return '[Error:groupId]-' + v4();
  }
};

/**
 * Parses the number of HITs available. Returns a default value of 1 if parsing fails.
 * @param input
 */
const parseBatchSize = (input: HTMLDivElement): number => {
  const batchSizeElem = input.querySelectorAll('td.capsule_field_text')[4];
  if (batchSizeElem && batchSizeElem.textContent) {
    return parseInt(batchSizeElem.textContent, 10);
  } else {
    return 1;
  }
};

const parseQualified = (input: HTMLDivElement): boolean =>
  !input.querySelector('a[href^="/mturk/requestqualification?"]');

const parseQualsRequired = (input: HTMLDivElement): string[] => {
  const qualsRequiredChildren = input.querySelectorAll(qualsRequiredSelector);
  /**
   * The first child of qualsRequiredChildren will just contain the text
   * 'Qualifications required', so start at 1 instead of 0.
   */
  return Array.from(qualsRequiredChildren)
    .slice(1)
    .map(el => parseSingleQualification(el));
};

const parseSingleQualification = (input: Element): string => {
  if (input && input.children) {
    const qualDivs = input.querySelectorAll('td > div > div');
    if (qualDivs.length > 1) {
      return handleMultipeQualChildDivs(qualDivs);
    } else {
      const qualText = qualDivs[0];
      if (qualText && qualText.textContent) {
        return qualText.textContent.trim();
      }
    }
  }

  return '[Error:qualification';
};

const handleMultipeQualChildDivs = (input: NodeListOf<Element>): string => {
  return Array.from(input)
    .map(partialQualText => {
      if (partialQualText && partialQualText.textContent) {
        return partialQualText.textContent.trim();
      } else {
        return '[Error:qual]';
      }
    })
    .join(' ');
};

export const parseSearchPage = (
  html: Document,
  freshSearch?: boolean
): SearchResults => {
  const hitContainers = selectHitContainers(html);

  const hitData = freshSearch
    ? tabulateFreshSearchData(hitContainers)
    : tabulateSearchData(hitContainers);
  return hitData;
};

const tabulateFreshSearchData = (input: HTMLDivElement[]): SearchResults =>
  input.reduce((map: SearchResults, hit: HTMLDivElement, index: number) => {
    const groupId = parseGroupId(hit);
    const memoizedDate = new Date();
    return map.set(
      groupId,
      createReadSearchItem(hit, groupId, index, memoizedDate)
    );
    // tslint:disable-next-line:align
  }, Map<string, SearchResult>());
