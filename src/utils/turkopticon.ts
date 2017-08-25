import {
  SearchItem,
  SearchResults,
  RequesterMap,
  RequesterScores,
  Requester
} from '../types';
import { turkopticonApiMulti } from '../constants';
import { Map } from 'immutable';
import axios from 'axios';

export const batchFetchTOpticon = async (requesterIds: string[]) => {
  /**
   * Potentially unsafe: We're relying on javascript's built-in type coercion of 
   * arrays to strings, which automatically appends a comma between array elements,
   * to build our query string.
   */
  try {
    const t0 = performance.now();
    const response = await axios.get(turkopticonApiMulti + requesterIds, {
      responseType: 'json'
    });
    // tslint:disable-next-line:no-console
    console.log('Time to fetch TO: ' + (performance.now() - t0));
    const data: Requester = response.data;
    return mapFromTO(data);
  } catch (e) {
    throw Error('Problem fetching data from TO');
  }
};

export const noTurkopticon = (hit: SearchItem) => !hit.turkopticon;
export const selectRequesterId = (hit: SearchItem) => hit.requesterId;
export const invalidGroupId = (hit: SearchItem) =>
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

export const mapFromTO = (data: Requester): RequesterMap =>
  Object.keys(data).reduce(
    (acc, id: string): RequesterMap => (data[id] ? acc.set(id, data[id]) : acc),
    Map<string, Requester>()
  );
