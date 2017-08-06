import axios from 'axios';
import { turkopticonApiMulti } from '../constants';

export const batchFetchTOpticon = (requesterIds: string[]) => {
  /**
   * Potentially unsafe: We're relying on javascript's built-in type coercion of 
   * arrays to strings, which automatically appends a comma between array elements,
   * to build our query string.
   */
  return axios.get(turkopticonApiMulti + requesterIds).then(
    response => {
      const data: TOpticonApiResponse = response.data;
      return Object.keys(data).map(requester => ({
        id: requester,
        ...data[requester]
      })) as RequesterDetails[];
    },
    reject => {
      return null;
    }
  );
};

export const filterHitsWithoutTO = (hits: HitTableEntry[]) => {
  return hits.filter(hit => !hit.turkopticon);
};

export const selectRequesterIds = (hits: HitTableEntry[]) => {
  return hits.map(hit => hit.requesterId);
};
