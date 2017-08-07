import { Requester, TOpticonResponse, HitTableEntry } from '../types';
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

export const mapFromTO = (data: TOpticonResponse): Map<string, Requester> =>
  Object.keys(data).reduce(
    (acc, requester: string): Map<string, Requester> =>
      acc.set(requester, data[requester]),
    Map<string, Requester>()
  );
