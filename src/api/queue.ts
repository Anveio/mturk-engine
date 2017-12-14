import axios from 'axios';
import { API_URL } from '../constants';
import { parseQueuePage } from '../utils/parsingWorkerQueue';

export const getQueuePage = async () => {
  try {
    const response = await axios.get<Document>(`${API_URL}/tasks`, {
      responseType: 'document'
    });
    return parseQueuePage(response.data);
  } catch (e) {
    throw Error('Problem getting queue page.');
  }
};
