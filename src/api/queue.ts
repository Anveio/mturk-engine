import axios from 'axios';
import { API_URL } from '../constants';
import { parseQueuePage } from '../utils/parsingQueue';

export const getQueuePage = async () => {
  try {
    const response = await axios.get<Document>(`${API_URL}/mturk/myhits`, {
      responseType: 'document'
    });
    return parseQueuePage(response.data);
  } catch (e) {
    throw Error('Problem getting queue page.');
  }
};
