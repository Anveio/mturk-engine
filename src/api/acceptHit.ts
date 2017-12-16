import axios from 'axios';
import { API_URL } from '../constants';
import { validateHitAccept } from '../utils/parsing';

export const validateHitAcceptRequest = async (groupId: string) => {
  try {
    console.log(groupId);

    const response = await axios.get<Document>(
      `${API_URL}/projects/${groupId}/tasks/accept_random`,
      {
        responseType: 'document'
      }
    );
    return validateHitAccept(response.data);
  } catch (e) {
    console.warn('Unknown problem accepting HIT.');
    return false;
  }
};
