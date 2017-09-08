import axios from 'axios';
import { TOpticonResponse } from '../types';
import { turkopticonApiMulti } from '../constants';
import { topticonMapFromTO } from '../utils/turkopticon';

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
    const data: TOpticonResponse = response.data;
    return topticonMapFromTO(data);
  } catch (e) {
    throw Error('Problem fetching data from TO');
  }
};
