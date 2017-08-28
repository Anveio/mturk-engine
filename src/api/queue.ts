import axios from 'axios';
import { API_URL } from '../constants';
import { parseQueuePage } from '../utils/parsing';

export const getQueuePage = async () => {
  try {
    const response = await axios.get(`${API_URL}/mturk/myhits`, {
      responseType: 'document'
    });
    // tslint:disable-next-line:no-console
    const documentResponse: Document = response.data;
    return parseQueuePage(documentResponse);
  } catch (e) {
    throw Error('Problem getting queue page.');
  }
};
