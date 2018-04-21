import axios from 'axios';
import { API_URL } from '../constants';
import { validateHitAccept } from '../utils/parsing';

export interface HitAcceptResponse {
  readonly successful: boolean;
}

/**
 * Strange code ahead, explanation:
 *
 * 1. This API call will *always* hit the catch block in production.
 * 2. This is because successfully accepting a HIT will redirect to a HTTP URL,
 * prompting the browser to cancel the request.
 * 3. Failing to accept a HIT will also hit the catch block because of a 404.
 * 4. We get the 404 only by sending in a nonsense string as the format.
 * 5. Therefore, if the request ends in a 404, the accept failed.
 * 6. Otherwise, it was successful.
 */

const failureStatusCodes = new Set([403, 404, 429, 500]);

export const sendHitAcceptRequest = async (
  groupId: string
): Promise<HitAcceptResponse> => {
  try {
    const response = await axios.get<Document>(
      `${API_URL}/projects/${groupId}/tasks/accept_random`,
      {
        params: {
          format: 'gibberish'
        },
        responseType: 'document'
      }
    );
    return {
      successful: validateHitAccept(response.data)
    };
  } catch (e) {
    if (e.response && failureStatusCodes.has(e.response.status)) {
      return {
        successful: false
      };
    }
    return {
      successful: true
    };
  }
};
