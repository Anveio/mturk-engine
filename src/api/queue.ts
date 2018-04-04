import axios from 'axios';
import { API_URL } from '../constants';
import { tabulateQueueApiResponse } from '../utils/parsingQueue';
import { QueueApiResponse } from '../worker-mturk-api';

export const getQueuePage = async () => {
  try {
    const response = await axios.get<QueueApiResponse>(`${API_URL}/tasks`, {
      params: {
        format: 'json'
      },
      responseType: 'json'
    });
    return tabulateQueueApiResponse(response.data.tasks);
  } catch (e) {
    throw Error('Problem getting queue page.');
  }
};
