import axios from 'axios';
import { SearchOptions } from '../types';
import { API_URL } from '../constants';
import { parseSearchPage } from '../utils/parsing';
import { generateParams } from '../utils/searchOptions';

export const searchHits = async (options: SearchOptions) => {
  try {
    const t0 = performance.now();
    const response = await axios.get(`${API_URL}/mturk/searchbar`, {
      params: generateParams(options),
      responseType: 'document'
    });
    // tslint:disable-next-line:no-console
    console.log('Time to fetch HITs: ' + (performance.now() - t0));
    const documentResponse: Document = response.data;
    return parseSearchPage(documentResponse);
  } catch (e) {
    throw Error('Problem fetching data from MTurk.');
  }
};
