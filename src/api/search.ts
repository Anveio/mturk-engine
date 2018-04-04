import axios from 'axios';
import * as qs from 'qs';
import { SearchOptions } from '../types';
import { API_URL } from '../constants';
import { generateParams } from '../utils/searchOptions';
import { tabulateSearchData } from '../utils/parsingSearch';
import { SearchResultsApiResponse } from '../worker-mturk-api';

export const searchHits = async (options: SearchOptions, fresh?: boolean) => {
  try {
    const t0 = performance.now();
    const response = await axios.get<SearchResultsApiResponse>(`${API_URL}`, {
      params: generateParams(options),
      paramsSerializer: params =>
        qs.stringify(params, { arrayFormat: 'brackets' }),
      responseType: 'json'
    });
    // tslint:disable-next-line:no-console
    console.log('Time to fetch HITs: ' + (performance.now() - t0));
    return tabulateSearchData(response.data.results, fresh);
  } catch (e) {
    throw Error('Problem fetching data from MTurk.');
  }
};
