import axios from 'axios';
import { SearchOptions } from '../types';
import { API_URL } from '../constants';
import { parseSearchPage } from './parsing';
import { generateParams } from './searchOptions';

export const batchFetchHits = async (options: SearchOptions) => {
  try {
    const t0 = performance.now();
    const response = await axios.get(`${API_URL}/mturk/searchbar`, {
      params: generateParams(options)
    });
    // tslint:disable-next-line:no-console
    console.log('Time to fetch HITs: ' + (performance.now() - t0));
    const rawHtml: string = response.data;
    return parseSearchPage(rawHtml);
  } catch (e) {
    throw Error('Problem fetching data from MTurk.');
  }
};
