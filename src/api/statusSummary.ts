import axios from 'axios';
import { API_URL } from '../constants';
import { parseStatusSummaryPage } from '../utils/parsingStatusSummary';

export const fetchStatusSummaryPage = async () => {
  try {
    const response = await axios.get<Document>(`${API_URL}/mturk/status`, {
      responseType: 'document'
    });
    return parseStatusSummaryPage(response.data);
  } catch (e) {
    throw Error('Problem fetching status summary: ' + e);
  }
};
