import {
  SearchResult,
  SearchResults,
  RequesterScores,
  TOpticonData,
  TOpticonResponse,
  RequesterMap,
  Requester
} from '../types';

import { Map } from 'immutable';
export const noTurkopticon = (hit: SearchResult) => !hit.requester.turkopticon;
export const selectRequesterId = (hit: SearchResult) => hit.requester.id;
export const invalidGroupId = (hit: SearchResult) =>
  !hit.groupId.startsWith('[Error:groupId]-');

/**
 * Returns the requesterIds of a SearchMap that correspond to a search result 
 * with no T.O.
 * @param hits 
 */
export const requesterIdsWithNoTO = (hits: SearchResults) => {
  return hits
    .filter(noTurkopticon)
    .filter(invalidGroupId)
    .map(selectRequesterId)
    .toArray();
};

export const calculateAverageScore = (
  scores: RequesterScores
): number | null => {
  const categories = filterCategories(scores);
  const total = Object.keys(categories).reduce(
    (acc, category: string) => acc + parseFloat(categories[category]),
    0
  );
  return Object.keys(categories).length > 0
    ? total / Object.keys(categories).length
    : null;
};

/**
 * Takes a RequesterScores object and returns a new object in which none of the  
 * keys correspond to the string '0.00'.
 * @param scores 
 */
export const filterCategories = (scores: RequesterScores) =>
  Object.keys(scores).reduce(
    (acc: Object, category: string) =>
      scores[category] !== '0.00'
        ? { ...acc, [category]: scores[category] }
        : acc,
    {}
  );

export const mapFromTO = (data: TOpticonResponse): RequesterMap =>
  Object.keys(data).reduce(
    (acc, id: string) =>
      data[id] ? acc.set(id, createRequester(data[id], id)) : acc,
    Map<string, Requester>()
  );

export const createRequester = (data: TOpticonData, id: string): Requester => ({
  id,
  name: data.name,
  turkopticon: data
});
