import axios from 'axios';
import { API_URL } from '../constants';
import { validateHitAccept } from '../utils/parsing';

export const validateHitAcceptRequest = async (groupId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/mturk/previewandaccept?groupId=${groupId}`,
      {
        params: {
          groupId
        },
        responseType: 'document'
      }
    );
    const html: Document = response.data;
    return validateHitAccept(html);
  } catch (e) {
    return false;
  }
};
