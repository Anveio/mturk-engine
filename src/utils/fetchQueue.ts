import axios from 'axios';
import { API_URL } from '../constants';
import { parseQueuePage } from './parsing';

export const getQueuePage = async () => {
  try {
    const response = await axios.get(`${API_URL}/mturk/myhits`);
    // tslint:disable-next-line:no-console
    const rawHtml: string = response.data;
    return parseQueuePage(rawHtml);
  } catch (e) {
    throw Error('Problem getting queue page.');
  }
};
