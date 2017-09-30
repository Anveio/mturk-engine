import axios from 'axios';
import { API_URL } from '../constants';
import { parseStatusDetailPage } from '../utils/parsingStatusDetail';

/**
 * E.g. '09222017'
 * @param encodedDateString 
 */
export const fetchStatusDetailPage = async (encodedDateString: string) => {
  try {
    const response = await axios.get(`${API_URL}/mturk/statusdetail`, {
      params: {
        encodedDate: encodedDateString
      },
      responseType: 'document'
    });
    return parseStatusDetailPage(response.data as Document);
  } catch (e) {
    throw Error('Problem fetching status detail: ' + e);
  }
};
