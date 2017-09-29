import axios from 'axios';
import { API_URL } from '../constants';
import { parseStatusDetailPage } from '../utils/parsingStatusDetail';

export const fetchStatusDetailPage = async (encodedDateString: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/statusdetail?encodedDate=${encodedDateString}`,
      {
        responseType: 'document'
      }
    );
    return parseStatusDetailPage(response.data as Document);
  } catch (e) {
    throw Error('Problem fetching status detail: ' + e);
  }
};
