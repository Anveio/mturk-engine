import {
  SearchResult,
  HitDatabaseEntry,
  RequesterAttributes,
  TOpticonResponse,
  TOpticonRequester,
  Requester,
  RequesterMap,
  TOpticonAttributes,
  AttributeWeights
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

  if (Object.keys(categories).length === 0) {
    return null;
  }

  const total = Object.keys(categories).reduce(
    (acc, category: string) => acc + parseFloat(categories[category]),
    0
  );

  return total / Object.keys(categories).length;
};

export const calculateWeightedAverageScore = (
  scores: RequesterAttributes,
  weights: AttributeWeights
): number | null => {
  const categories = filterCategories(scores);

  if (Object.keys(categories).length === 0) {
    return null;
  }

  const total = Object.keys(categories).reduce(
    (acc, category: string) =>
      acc + categories[category] * weights[`${category}Weight`],
    0
  );
  const sumOfWeights = objectValueSumation<AttributeWeights>(weights);
  return total / sumOfWeights;
};

export const objectValueSumation = <T>(obj: T): number =>
  Object.values(obj).reduce((acc, cur): number => acc + cur, 0);

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

export const topticonMapFromTO = (
  data: TOpticonResponse,
  weights: AttributeWeights
): RequesterMap =>
  Object.keys(data).reduce(
    (acc, id: string) =>
      data[id]
        ? acc.set(id, topticonRequesterToRequester(id, data[id], weights))
        : acc,
    Map<string, Requester>()
  );

export const topticonRequesterToRequester = (
  id: string,
  requester: TOpticonRequester,
  weights: AttributeWeights
): Requester => {
  const scores = stringScoresToNumbers(requester.attrs);
  const unweightedAverageScore = calculateAverageScore(scores);
  const weightedAverageScore = calculateWeightedAverageScore(scores, weights);

  return {
    id,
    name: requester.name,
    turkopticon: {
      scores,
      unweightedAverageScore,
      weightedAverageScore,
      numReviews: requester.reviews,
      numTosFlags: requester.tos_flags
    }
  };
};

const stringScoresToNumbers = (
  scores: TOpticonAttributes
): RequesterAttributes => {
  return Object.keys(scores)
    .filter(validTurkopticonAttributeScore)
    .reduce(
      (acc: RequesterAttributes, category: string): RequesterAttributes => ({
        ...acc,
        [category]: +scores[category] || null
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
