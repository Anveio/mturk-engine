import axios from 'axios';
import { API_URL } from '../constants';
import { generateAccountInfo } from '../utils/parsingWorkerAccount';
import { parseWorkedDates } from '../utils/parsingWorkerHitHistory';
import { DashboardApiResponse } from '../worker-mturk-api';

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
    const response = await axios.get<DashboardApiResponse>(
      `${API_URL}/dashboard`,
      {
        params: {
          format: 'json'
        },
        responseType: 'json'
      }
    );
    return parseWorkedDates(response.data);
  } catch (e) {
    throw Error('Problem fetching status summary: ' + e);
  }
};
