import {
  HitDatabaseEntry,
  HitDatabaseMap,
  Requester,
  HitStatus
} from '../types';
import { statusDetailHitLink } from '../constants/querySelectors';
import { Map } from 'immutable';
import * as v4 from 'uuid/v4';

interface AnchorElemInfo {
  requester: Requester;
  hitId: string;
}

export const parseStatusDetailPage = (html: Document): HitDatabaseMap => {
  const hitRows = selectHitRows(html);
  return tabulateHitDbEntries(hitRows);
};

const tabulateHitDbEntries = (input: HTMLTableRowElement[]): HitDatabaseMap =>
  input.reduce((map: HitDatabaseMap, hit: HTMLTableRowElement) => {
    const hitId = parseAnchorElem(hit).hitId;
    return map.set(hitId, generateHitDbEntry(hit));
  },           Map<string, HitDatabaseEntry>());

const generateHitDbEntry = (input: HTMLTableRowElement): HitDatabaseEntry => {
  const { hitId, requester } = parseAnchorElem(input);
  return {
    id: hitId,
    requester: {
      id: requester.id,
      name: requester.name
    },
    date: new Date(),
    reward: parseReward(input),
    status: parseStatus(input),
    title: parseTitle(input)
  };
};

const parseAnchorElem = (input: HTMLTableRowElement): AnchorElemInfo => {
  const anchorElem = input.querySelector(
    statusDetailHitLink
  ) as HTMLAnchorElement;
  return {
    hitId: parseHitId(anchorElem),
    requester: {
      id: parseRequesterId(anchorElem),
      name: parseRequesterName(anchorElem)
    }
  };
};

const selectHitRows = (html: Document): HTMLTableRowElement[] => {
  const hitTable = html.querySelector('#dailyActivityTable > tbody');
  if (hitTable && hitTable.children) {
    return Array.from(hitTable.children) as HTMLTableRowElement[];
  } else {
    return [];
  }
};

const parseHitId = (input: HTMLAnchorElement): string => {
  const href = input.getAttribute('href') as string;
  const hitIdRegexResult = /hitId=(.*)&requesterName/g.exec(href);
  /**
   * Use verbose null checks because HitDatabaseEntries are indexed by HitId,
   * and this function needs to never throw an error or a null result.
   */
  return hitIdRegexResult && hitIdRegexResult.length >= 2
    ? hitIdRegexResult[1]
    : '[Error:hitId]' + v4();
};

const parseRequesterId = (input: HTMLAnchorElement): string => {
  const href = input.getAttribute('href') as string;
  try {
    return (/requesterId=(.*)&hitId/g.exec(href) as string[])[1];
  } catch (e) {
    return '[Error:requesterId]';
  }
};

const parseRequesterName = (input: HTMLAnchorElement): string => {
  const href = input.getAttribute('href') as string;
  try {
    return (/requesterName=(.*)&subject/g.exec(href) as string[])[1];
  } catch (e) {
    return '[Error:requesterName]';
  }
};

const parseTitle = (input: HTMLTableRowElement): string => {
  const descriptionElem = input.querySelector(
    'td.statusdetailTitleColumnValue'
  );

  if (descriptionElem && descriptionElem.textContent) {
    return descriptionElem.textContent.trim();
  } else {
    return '[Error:description]';
  }
};

const parseReward = (input: HTMLTableRowElement): string => {
  const rewardElem = input.querySelector('td.statusdetailAmountColumnValue');

  if (rewardElem && rewardElem.textContent) {
    return rewardElem.textContent.trim().slice(1);
  } else {
    return '[Error:reward]';
  }
};

const parseStatus = (input: HTMLTableRowElement): HitStatus => {
  const rewardElem = input.querySelector('td.statusdetailStatusColumnValue');

  if (rewardElem && rewardElem.textContent) {
    return rewardElem.textContent.trim().split(' ')[0] as HitStatus;
  } else {
    return 'Pending';
  }
};
