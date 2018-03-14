import axios from 'axios';
import { API_URL } from '../constants';
import { QueueItem } from '../types';
import * as qs from 'qs';

export const sendReturnHitRequest = async (
  queueItem: QueueItem,
  token: string
) => {
  try {
    const { groupId, taskId, hitId } = queueItem;
    const formPayload = qs.stringify({
      _method: 'delete',
      authenticity_token: token
    });

    const response = await axios.post(
      `${API_URL}/projects/${groupId}/tasks/${taskId}`,
      formPayload,
      {
        params: {
          assignment_id: hitId
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
