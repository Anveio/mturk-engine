import axios from 'axios';
import { API_URL } from '../constants';
import { validateHitAccept } from '../utils/parsing';
import { parseWorkerHit } from '../utils/parsingWorkerHit';
import { QueueItem } from '../types';

export interface HitAcceptResponse {
  readonly successful: boolean;
  readonly acceptedHitInfo: QueueItem | null;
}

export const sendHitAcceptRequest = async (
  groupId: string
): Promise<HitAcceptResponse> => {
  try {
    const response = await axios.get<Document>(
      `${API_URL}/projects/${groupId}/tasks/accept_random`,
      {
        responseType: 'document'
      }
    );

    return {
      successful: validateHitAccept(response.data),
      acceptedHitInfo: parseWorkerHit(response.data)
    };
  } catch (e) {
    console.warn(e);
    return {
      successful: false,
      acceptedHitInfo: null
    };
  }
};
