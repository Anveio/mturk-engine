import axios from 'axios';
import { List } from 'immutable';
import { TOpticonResponse } from '../types';
import { turkopticonApiMulti } from '../constants/urls';

export const batchFetchTOpticon = async (requesterIds: List<string>) => {
  try {
    const t0 = performance.now();
    const response = await axios.get<TOpticonResponse>(turkopticonApiMulti, {
      params: {
        ids: requesterIds.join(',')
      },
      responseType: 'json'
    });
    // tslint:disable-next-line:no-console
    console.log('Time to fetch TO: ' + (performance.now() - t0));
    return response.data;
  } catch (e) {
    throw Error('Problem fetching data from TO');
  }
};
