import axios from 'axios';
import { API_URL } from '../constants';
import { QueueItem } from '../types';
import { parseQueueAuthToken } from '../utils/parsingAuthToken';

export const getHitAuthToken = async (item: QueueItem) => {
  try {
    const { groupId, taskId, hitId } = item;
    const response = await axios.get<Document>(
      `${API_URL}/projects/${groupId}/tasks/${taskId}`,
      {
        params: {
          assignment_id: hitId
        },
        responseType: 'document'
      }
    );
    return parseQueueAuthToken(response.data);
  } catch (e) {
    throw new Error('Unknown problem with returning Hit.');
  }
};
