import axios from 'axios';
import { API_URL } from '../constants';
import { parseHitPage } from './parsing';

export const getQueuePage = async () => {
  try {
    const t0 = performance.now();
    const response = await axios.get(`${API_URL}/mturk/myhits`);
    // tslint:disable-next-line:no-console
    console.log('Time to fetch queue: ' + (performance.now() - t0));
    const rawHtml: string = response.data;
    /**
     * TODO: parseHitPage does not properly parse queue page. 
     * Make a separate utility function to do so.
     */
    return parseHitPage(rawHtml);
  } catch (e) {
    throw Error('Problem getting queue page.');
  }
};
