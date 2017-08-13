import axios from 'axios';
import { SearchOptions, HitSorting } from '../types';
import { API_URL } from '../constants';
import { parseHitPage } from './parsing';

export const batchFetchHits = async (options: SearchOptions) => {
  try {
    const t0 = performance.now();
    const response = await axios.get(`${API_URL}${generateQueryString(options)}`);
    // tslint:disable-next-line:no-console
    console.log('Time to fetch HITs: ' + (performance.now() - t0));
    const rawHtml: string = response.data;
    return parseHitPage(rawHtml);
  } catch (e) {
    throw Error('Problem fetching data from MTurk.');
  }
};

export const generateQueryString = (options: SearchOptions) => {
  const nonParam = `/mturk/searchbar?`;
  return `${nonParam}${sortParam(options.sortType)}`;
};

const sortParam = (sorting: HitSorting): string => {
  switch (sorting) {
    case 'Latest':
      return 'selectedSearchType=hitgroups&LastUpdatedTime%3A1';
    case 'Batch Size':
      return 'selectedSearchType=hitgroups&sortType=NumHITs%3A1';
    case 'Reward':
      return 'selectedSearchType=hitgroups&Reward%3A1';
    default:
      throw new Error('Problem generating sortType param');
  }
};
