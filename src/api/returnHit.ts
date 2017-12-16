import axios from 'axios';
import { API_URL } from '../constants';
import { validateHitReturn } from '../utils/returnHit';
import { QueueItem } from '../types';

export const sendReturnHitRequest = async (
  queueItem: QueueItem,
  token: string
) => {
  try {
    const { groupId, taskId, hitId } = queueItem;
    const response = await axios.post(
      `${API_URL}/projects/${groupId}/tasks/${taskId}`,
      {
        _method: 'delete',
        authenticityToken: token
      },

      {
        params: {
          assignment_id: hitId
        }
      }
    );
    console.log(response.data);
    return validateHitReturn(response.data);
  } catch (e) {
    throw new Error('Unknown problem with returning Hit.');
  }
};
