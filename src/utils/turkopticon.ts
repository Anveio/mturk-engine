import {
  Hit,
  HitMap,
  Requester,
  RequesterMap,
  RequesterScores,
  TOpticonResponse
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
    const response = await axios.get(turkopticonApiMulti + requesterIds);
    // tslint:disable-next-line:no-console
    console.log('Time to fetch TO: ' + (performance.now() - t0));
    const data: TOpticonResponse = response.data;
    return mapFromTO(data);
  } catch (e) {
    throw Error('Problem fetching data from TO');
  }
};

export const noTurkopticon = (hit: Hit) => !hit.turkopticon;
export const selectRequesterId = (hit: Hit) => hit.requesterId;
export const hitMapToRequesterIdsArray = (hits: HitMap) => {
  return hits.filter(noTurkopticon).map(selectRequesterId).toArray();
};

export const calculateAverageScore = (scores: RequesterScores): string => {
  const categories = filterCategories(scores);
  const total = Object.keys(categories).reduce(
    (acc, category: string) => acc + parseFloat(categories[category]),
    0
  );
  return (total / Object.keys(categories).length).toFixed(2);
};

/**
 * Takes a RequesterScores object and returns a new object in which none of the  
 * keys correspond to the string '0.00'.
 * @param scores 
 */
export const filterCategories = (scores: RequesterScores) =>
  Object.keys(scores).reduce(
    (acc: Object, category: string) =>
      scores[category] !== '0.00' ? { ...acc, [category]: scores[category] } : acc,
    {}
  );

export const mapFromTO = (data: TOpticonResponse): RequesterMap =>
  Object.keys(data).reduce(
    (acc, requester: string): RequesterMap =>
      data[requester] ? acc.set(requester, data[requester]) : acc,
    Map<string, Requester>()
  );
