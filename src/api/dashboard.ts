import axios from 'axios';
import { API_URL } from '../constants';
import { generateAccountInfo } from '../utils/parsingWorkerAccount';
import { parseWorkerHitHistory } from '../utils/parsingWorkerHitHistory';

export const fetchDashboard = async () => {
  try {
    const response = await axios.get<Document>(`${API_URL}/dashboard`, {
      responseType: 'document'
    });
    return generateAccountInfo(response.data);
  } catch (e) {
    throw Error('Problem fetching dashboard. ' + e);
  }
};

export const fetchSubmittedHitHistory = async () => {
  try {
    const response = await axios.get<Document>(`${API_URL}/dashboard`, {
      responseType: 'document'
    });
    return parseWorkerHitHistory(response.data);
  } catch (e) {
    throw Error('Problem fetching status summary: ' + e);
  }
};
