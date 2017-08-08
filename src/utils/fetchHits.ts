import axios from 'axios';
import { API_URL } from '../constants';
import { parseHitPage } from './parsing';

export const batchFetchHits = async () => {
  try {
    const t0 = performance.now();
    const response = await axios.get(`${API_URL}/mturk/findhits?match=true`);
    console.log('Time to fetch HITs: ' + (performance.now() - t0));
    const rawHtml: string = response.data;
    return parseHitPage(rawHtml);
  } catch (e) {
    throw Error('Problem fetching data from MTurk.');
  }
};
