import axios from 'axios';
import * as qs from 'qs';
import { SearchOptions } from '../types';
import { API_URL } from '../constants';
import { generateParams } from '../utils/searchOptions';
import { parseWorkerSearchPage } from '../utils/parsingWorkerSearch';

export const searchHits = async (options: SearchOptions, fresh?: boolean) => {
  try {
    const t0 = performance.now();
    const response = await axios.get<Document>(`${API_URL}`, {
      params: generateParams(options),
      paramsSerializer: params =>
        qs.stringify(params, { arrayFormat: 'brackets' }),
      responseType: 'document'
    });
    // tslint:disable-next-line:no-console
    console.log('Time to fetch HITs: ' + (performance.now() - t0));
    return parseWorkerSearchPage(response.data, fresh);
  } catch (e) {
    throw Error('Problem fetching data from MTurk.');
  }
};
