import axios from 'axios';
import { API_URL } from '../constants';
import { tabulateQueueData } from '../utils/parsingWorkerQueue';
import { QueueApiResponse } from '../worker-mturk-api';

export const getQueuePage = async () => {
  try {
    const response = await axios.get<QueueApiResponse>(`${API_URL}/tasks`, {
      params: {
        format: 'json'
      },
      responseType: 'json'
    });
    return tabulateQueueData(response.data.tasks);
  } catch (e) {
    throw Error('Problem getting queue page.');
  }
};
