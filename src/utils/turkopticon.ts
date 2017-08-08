import {
  Requester,
  TOpticonResponse,
  HitTableEntry,
  RequesterScores
} from '../types';
import { turkopticonApiMulti } from '../constants';
import { Map } from 'immutable';
import axios from 'axios';

export const batchFetchTOpticon = (requesterIds: string[]) => {
  /**
   * Potentially unsafe: We're relying on javascript's built-in type coercion of 
   * arrays to strings, which automatically appends a comma between array elements,
   * to build our query string.
   */
  const t0 = performance.now();
  return axios
    .get(turkopticonApiMulti + requesterIds)
    .then(response => {
      console.log('Time to ping TO ' + (performance.now() - t0));
      const data: TOpticonResponse = response.data;
      return mapFromTO(data);
    })
    .catch();
};

export const filterHitsWithoutTO = (hits: HitTableEntry[]) => {
  return hits.filter(hit => !hit.turkopticon);
};

export const selectRequesterIds = (hits: HitTableEntry[]) => {
  return hits.map(hit => hit.requesterId);
};

export const calculateAverageScore = (scores: RequesterScores) => {
  const categories = filterCategories(scores);
  const total = Object.keys(categories).reduce(
    (acc, category: string) => parseFloat(categories[category]),
    0
  );

  return total / Object.keys(categories).length;
};

/**
 * Takes a RequesterScores object and returns a new object in which none of the  
 * keys correspond to the string '0.00'.
 * @param scores 
 */
export const filterCategories = (scores: RequesterScores) =>
  Object.keys(scores).reduce(
    (acc, category: string) =>
      scores[category] !== '0.00' ? { ...acc, ...scores[category] } : acc,
    {}
  );

export const mapFromTO = (data: TOpticonResponse): Map<string, Requester> =>
  Object.keys(data).reduce(
    (acc, requester: string): Map<string, Requester> =>
      data[requester] ? acc.set(requester, data[requester]) : acc,
    Map<string, Requester>()
  );

export const assignTOpticonToHit = (
hits: HitTableEntry[],
requesters: Map<string, Requester>
) => {

};
