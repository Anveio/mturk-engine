import axios from 'axios';
import { API_URL } from '../constants';
import { validateHitReturn } from '../utils/returnHit';

export const sendReturnHitRequest = async (hitId: string) => {
  try {
    const response = await axios.get<Document>(`${API_URL}/mturk/return`, {
      params: {
        hitId,
        inPipeline: false
      },
      responseType: 'document'
    });
    return validateHitReturn(response.data);
  } catch (e) {
    throw new Error('Unknown problem with returning Hit.');
  }
};
