import axios from 'axios';
import { API_URL } from '../constants';
import { validateHitAccept } from '../utils/parsing';

export interface HitAcceptResponse {
  readonly successful: boolean;
  readonly htmlResponse: Document;
}

export const sendHitAcceptRequest = async (
  groupId: string
): Promise<HitAcceptResponse> => {
  try {
    const response = await axios.get<Document>(
      `${API_URL}/projects/${groupId}/tasks/accept_random`,
      {
        headers: {
          'Upgrade-Insecure-Requests': 1
        },
        responseType: 'document'
      }
    );

    return {
      successful: validateHitAccept(response.data),
      htmlResponse: response.data
    };
  } catch (e) {
    throw Error();
  }
};
