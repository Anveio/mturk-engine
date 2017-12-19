import axios from 'axios';
import { API_URL } from '../constants';
import { QueueItem } from '../types';
import { parseHitAuthToken } from '../utils/parsingAuthToken';

export const getHitAuthToken = async (item: QueueItem) => {
  try {
    const { groupId, taskId, hitId } = item;
    const response = await axios.get<Document>(
      `${API_URL}/projects/${groupId}/tasks/${taskId}`,
      {
        params: {
          assignment_id: hitId,
        },
        responseType: 'document'
      }
    );
    return parseHitAuthToken(response.data);
  } catch (e) {
    console.warn(e);
    return null;
  }
};
