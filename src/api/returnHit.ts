import axios from 'axios';
import * as qs from 'qs';
import { API_URL } from '../constants';
import { QueueItem } from '../types';

export const sendReturnHitRequest = async (
  queueItem: QueueItem,
  token: string
) => {
  try {
    const { groupId, taskId, hitId } = queueItem;
    const response = await axios.post(
      `${API_URL}/projects/${groupId}/tasks/${taskId}`,
      formatFormPayload(token),
      {
        params: {
          assignment_id: hitId,
          ref: 'w_wp_rtrn_top'
        }
      }
    );
    return response.status === 302;
  } catch (e) {
    return true;
  }
};

const formatFormPayload = (token: string): string =>
  qs.stringify({
    utf8: '✓',
    _method: 'delete',
    authenticity_token: token
  });
