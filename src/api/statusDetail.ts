import axios from 'axios';
import { API_URL } from '../constants';
import { generateAccountInfo } from '../utils/parsingAccount';

export const fetchDashboard = async () => {
  try {
    const response = await axios.get(`${API_URL}/mturk/dashboard`, {
      responseType: 'document'
    });
    const documentResponse = response.data;
    return generateAccountInfo(documentResponse);
  } catch (e) {
    throw Error('Problem fetching data from MTurk.' + e);
  }
};
