import {
  HitDatabaseEntry,
  HitDatabaseMap,
  Requester,
  HitStatus
} from '../types';
import { Map } from 'immutable';
import * as v4 from 'uuid/v4';
import {
  statusDetailHitLink,
  statusDetailMorePages
} from '../constants/querySelectors';
import { StatusDetailPageInfo } from '../api/statusDetail';

interface AnchorElemInfo {
  requester: Requester;
  hitId: string;
}

export const parseStatusDetailPage = (
  html: Document,
  dateString: string
): StatusDetailPageInfo => {
  const hitRows = selectHitRows(html);
  return {
    morePages: detectMorePages(html),
    data: tabulateHitDbEntries(hitRows, dateString)
  };
};

const tabulateHitDbEntries = (
  input: HTMLTableRowElement[],
  dateString: string
): HitDatabaseMap =>
  input.reduce((map: HitDatabaseMap, hit: HTMLTableRowElement) => {
    const anchorElemInfo = parseAnchorElem(hit);
    return map.set(
      anchorElemInfo.hitId,
      generateHitDbEntry(hit, anchorElemInfo, dateString)
    );
    // tslint:disable-next-line:align
  }, Map<string, HitDatabaseEntry>());

const generateHitDbEntry = (
  input: HTMLTableRowElement,
  anchorElemInfo: AnchorElemInfo,
  dateString: string
): HitDatabaseEntry => {
  const { hitId, requester } = anchorElemInfo;
  return {
    id: hitId,
    reward: parseReward(input),
    bonus: 0,
    requester: {
      id: requester.id,
      name: requester.name
    },
    date: dateString,
    status: parseStatus(input),
    title: parseTitle(input)
  };
};

const detectMorePages = (html: Document): boolean => {
  return !!html.querySelector(statusDetailMorePages);
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
    /**
     * .slice(1)?
     * Because The first child will contain no data (just a gray header),
     */
    return Array.from(hitTable.children).slice(1) as HTMLTableRowElement[];
  } else {
    return [];
  }
};

const parseHitId = (input: HTMLAnchorElement): string => {
  try {
    const href = input.getAttribute('href') as string;
    const hitIdRegexResult = /hitId=(.*)&requesterName/g.exec(href);
    /**
     * Use verbose null checks because HitDatabaseEntries are indexed by HitId,
     * and this function needs to never throw an error or a null result.
     */
    return hitIdRegexResult && hitIdRegexResult.length >= 2
      ? hitIdRegexResult[1]
      : '[Error:hitId]' + v4();
  } catch (e) {
    return '[Error:hitId]' + v4();
  }
};

const parseRequesterId = (input: HTMLAnchorElement): string => {
  try {
    const href = input.getAttribute('href') as string;
    return (/requesterId=(.*)&hitId/g.exec(href) as string[])[1];
  } catch (e) {
    return '[Error:requesterId]';
  }
};

const parseRequesterName = (input: HTMLAnchorElement): string => {
  const nameSpan = input.querySelector('span');
  // return (/requesterName=(.*)&subject/g.exec(href) as string[])[1];
  if (nameSpan && nameSpan.textContent) {
    return nameSpan.textContent.trim();
  } else {
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

const parseReward = (input: HTMLTableRowElement): number => {
  const rewardElem = input.querySelector('td.statusdetailAmountColumnValue');

  if (rewardElem && rewardElem.textContent) {
    /**
     * .slice(1)? The first character is a dollar symbol.
     */
    return parseFloat(rewardElem.textContent.trim().slice(1));
  } else {
    return 0;
  }
};

const parseStatus = (input: HTMLTableRowElement): HitStatus => {
  const rewardElem = input.querySelector('td.statusdetailStatusColumnValue');

  if (rewardElem && rewardElem.textContent) {
    return /Pending\sPayment/.test(rewardElem.textContent)
      ? 'Pending Payment'
      : rewardElem.textContent.trim() as HitStatus;
  } else {
    return 'Pending';
  }
};
