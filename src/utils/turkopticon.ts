import {
  SearchResult,
  HitDatabaseEntry,
  RequesterScores,
  TOpticonResponse,
  TOpticonRequester,
  Requester,
  RequesterMap,
  TOpticonMap
} from '../types';
import { turkopticonBaseUrl } from '../constants/urls';

import { Map } from 'immutable';
export const noTurkopticon = (hit: SearchResult) => !hit.requester.turkopticon;
export const selectHitRequester = (hit: SearchResult) => hit.requester;
export const selectRequesterId = (requester: Requester) => requester.id;
export const invalidGroupId = (hit: SearchResult) =>
  !hit.groupId.startsWith('[Error:groupId]-');

/**
 * Returns the requesterIds of a SearchMap that correspond to a search result
 * with no T.O.
 * @param hits
 */
// export const requesterIdsWithNoTO = (hits: SearchResults) => {
//   return hits
//     .filter(noTurkopticon)
//     .filter(invalidGroupId)
//     .map(selectHitRequester)
//     .toArray();
// };

export const calculateAverageScore = (
  scores: RequesterScores
): number | null => {
  if (!hasAValidScore(scores)) {
    return null;
  }
  const categories = filterCategories(scores);
  const total = Object.keys(categories).reduce(
    (acc, category: string) => acc + parseFloat(categories[category]),
    0
  );

  return total / Object.keys(categories).length;
};

export const hasAValidScore = (scores: RequesterScores): boolean =>
  Object.keys(scores).some(category => scores[category] !== '0.00');

/**
 * Takes a RequesterScores object and returns a new object in which none of the
 * keys correspond to the string '0.00'.
 * @param scores
 */
export const filterCategories = (
  scores: RequesterScores
): Partial<RequesterScores> =>
  Object.keys(scores).reduce(
    (acc: Object, category: string) =>
      scores[category] !== '0.00'
        ? { ...acc, [category]: scores[category] }
        : acc,
    {}
  );

export const topticonMapFromTO = (data: TOpticonResponse): TOpticonMap =>
  Object.keys(data).reduce(
    (acc, id: string) => (data[id] ? acc.set(id, data[id]) : acc),
    Map<string, TOpticonRequester>()
  );

export const requesterMapFromTO = (data: TOpticonMap): RequesterMap =>
  data.reduce(
    (acc: RequesterMap, value: TOpticonRequester, key: string): RequesterMap =>
      acc.set(key, createRequester(data.get(key), key)),
    Map<string, Requester>()
  );

export const createRequester = (data: TOpticonRequester, id: string): Requester => ({
  id,
  name: data.name,
  turkopticon: data
});

export const updateRequesterTOpticonData = (data: TOpticonMap) => (
  requester: Requester
): Requester => ({
  ...requester,
  turkopticon: data.get(requester.id)
});

export const generateReviewLink = (
  hit: HitDatabaseEntry | SearchResult
): string => {
  const { requester } = hit;
  return (
    turkopticonBaseUrl +
    'report?requester[amzn_id]=' +
    requester.id +
    '&requester[amzn_name]=' +
    requester.name +
    '&report[hit_names]=' +
    hit.title
  );
};

export const generateContactLink = (hit: HitDatabaseEntry): string => {
  const { requester, id, title } = hit;
  return (
    'https://www.mturk.com/mturk/contact?requesterId=' +
    requester.id +
    '&hitId=' +
    id +
    '&requesterName=' +
    requester.name +
    '&subject=Regarding Amazon Mechanical Turk HIT' +
    id +
    '&hitTitle=' +
    title
  );
};

export const generateContactLinkSearchResult = (hit: SearchResult) => {
  const { requester, groupId, title } = hit;
  return (
    'https://www.mturk.com/mturk/contact?requesterId=' +
    requester.id +
    '&requesterName=' +
    requester.name +
    '&subject=Regarding Amazon Mechanical Turk HIT of group ID ' +
    groupId +
    '&hitTitle=' +
    title
  );
};
