import {
  SearchResult,
  HitDatabaseEntry,
  RequesterAttributes,
  TOpticonResponse,
  TOpticonRequester,
  Requester,
  RequesterMap,
  TOpticonAttributes,
  AttributeWeights,
  GroupId
} from '../types';
import { turkopticonBaseUrl } from '../constants/urls';

import { Map } from 'immutable';
export const noTurkopticon = (hit: SearchResult) => !hit.requester.turkopticon;
export const selectHitRequesterId = (hit: SearchResult) => hit.requester.id;
export const selectRequesterId = (requester: Requester) => requester.id;
export const invalidGroupId = (hit: SearchResult) =>
  !hit.groupId.startsWith('[Error:groupId]-');

export const calculateWeightedAverageScore = (
  scores: RequesterAttributes,
  weights: AttributeWeights
): number | null => {
  const categories = filterCategories(scores);

  const total = Object.keys(categories).reduce(
    (acc, category: string) =>
      acc + categories[category] * weights[`${category}Weight`],
    0
  );
  return total / sumOfApplicableWeights(categories, weights) || null;
};

export const objectValueSumation = <T>(obj: T): number =>
  Object.values(obj).reduce((acc, cur): number => acc + cur, 0);

export const sumOfApplicableWeights = (
  categories: Partial<RequesterAttributes>,
  weights: AttributeWeights
): number =>
  Object.keys(categories).reduce(
    (acc: number, cur: string) => acc + weights[`${cur}Weight`],
    0
  );

/**
 * Takes a RequesterScores object and returns a new object in which none of the
 * keys correspond to the string '0.00'.
 * @param scores
 */
export const filterCategories = (
  scores: RequesterAttributes
): Partial<RequesterAttributes> =>
  Object.keys(scores).reduce(
    (acc: Object, category: string) =>
      scores[category] !== null
        ? { ...acc, [category]: scores[category] }
        : acc,
    {}
  );

export const hasAValidScore = (scores: RequesterAttributes) =>
  Object.values(scores).some(value => value !== null);

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

  return {
    id,
    name: requester.name,
    turkopticon: {
      scores,
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

export const sortByWeightedTo = (
  weightedToMap: Map<GroupId, number | null>,
  minScore: number
) => (hit: SearchResult): boolean => {
  if (!hit.requester.turkopticon) {
    return true;
  }

  const averageScore = weightedToMap.get(hit.groupId);

  if (!averageScore) {
    return true;
  }

  return averageScore >= minScore;
};
