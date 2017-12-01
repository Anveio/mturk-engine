import axios from 'axios';
import { SearchOptions } from '../types';
import { API_URL } from '../constants';
import { parseSearchPage } from '../utils/parsingSearch';
import { generateParams } from '../utils/searchOptions';

export const searchHits = async (options: SearchOptions, fresh?: boolean) => {
  try {
    const t0 = performance.now();
    const response = await axios.get<Document>(`${API_URL}/mturk/searchbar`, {
      params: generateParams(options),
      responseType: 'document'
    });
    // tslint:disable-next-line:no-console
    console.log('Time to fetch HITs: ' + (performance.now() - t0));
    return parseSearchPage(response.data, fresh);
  } catch (e) {
    throw Error('Problem fetching data from MTurk.');
  }
};
