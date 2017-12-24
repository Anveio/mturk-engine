import {
  SearchResult,
  HitDatabaseEntry,
  RequesterAttributes,
  TOpticonResponse,
  TOpticonRequester,
  Requester,
  RequesterMap,
  TOpticonAttributes
} from '../types';
import { turkopticonBaseUrl } from '../constants/urls';

import { Map } from 'immutable';
export const noTurkopticon = (hit: SearchResult) => !hit.requester.turkopticon;
export const selectHitRequester = (hit: SearchResult) => hit.requester;
export const selectRequesterId = (requester: Requester) => requester.id;
export const invalidGroupId = (hit: SearchResult) =>
  !hit.groupId.startsWith('[Error:groupId]-');

export const calculateAverageScore = (
  scores: RequesterAttributes
): number | null => {
  const categories = filterCategories(scores);
  const total = Object.keys(categories).reduce(
    (acc, category: string) => acc + parseFloat(categories[category]),
    0
  );

  return total / Object.keys(categories).length;
};

/**
 * Takes a RequesterScores object and returns a new object in which none of the
 * keys correspond to the string '0.00'.
 * @param scores
 */
export const filterCategories = (
  scores: RequesterAttributes
): RequesterAttributes =>
  Object.keys(scores).reduce(
    (acc: Object, category: string) =>
      scores[category] !== '0.00'
        ? { ...acc, [category]: scores[category] }
        : acc,
    {}
  );

export const hasAValidScore = (scores: RequesterAttributes) =>
  Object.values(scores).some(value => value !== 0);

export const topticonMapFromTO = (data: TOpticonResponse): RequesterMap =>
  Object.keys(data).reduce(
    (acc, id: string) =>
      data[id] ? acc.set(id, topticonRequesterToRequester(id, data[id])) : acc,
    Map<string, Requester>()
  );

export const topticonRequesterToRequester = (
  id: string,
  requester: TOpticonRequester
): Requester => ({
  id,
  name: requester.name,
  turkopticon: {
    numReviews: requester.reviews,
    numTosFlags: requester.tos_flags,
    scores: stringScoresToNumbers(requester.attrs)
  }
});

const stringScoresToNumbers = (
  scores: TOpticonAttributes
): RequesterAttributes => {
  return Object.keys(scores)
    .filter(validTurkopticonAttributeScore)
    .reduce(
      (acc: RequesterAttributes, category: string): RequesterAttributes => ({
        ...acc,
        [category]: +scores[category]
      }),
      {}
    );
};

const validTurkopticonAttributeScore = (score: string) => score !== '0.00';


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
