import axios from 'axios';
import { List } from 'immutable';
import { TOpticonResponse, RequesterId } from '../types';
import { turkopticonApiMulti } from '../constants/urls';

export const fetchTurkopticonData = async (requesterIds: List<RequesterId>) => {
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
