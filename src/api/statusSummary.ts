import axios from 'axios';
import { API_URL } from '../constants';
import { parseStatusPage } from '../utils/parsingStatusSummary';

export const fetchStatusDetailPage = async (encodedDateString: string) => {
  try {
    const response = await axios.get(`${API_URL}/mturk/status`, {
      responseType: 'document'
    });
    return parseStatusPage(response.data as Document);
  } catch (e) {
    throw Error('Problem fetching status summary: ' + e);
  }
};
