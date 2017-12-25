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
    // tslint:disable:max-line-length
    console.warn(
      `HIT with title: "${
        queueItem.title
      }" was most likely successfully returned even though there may be a network error reported in your browser's console. This is because returning a HIT  causes Amazon to redirect to the sign in page, which disallows requests from worker.mturk.com`
    );
    return true;
  }
};

const formatFormPayload = (token: string): string =>
  qs.stringify({
    _method: 'delete',
    authenticity_token: token
  });
