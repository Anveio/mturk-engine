import axios from 'axios';
import { HitDatabaseMap } from '../types';
import { API_URL } from '../constants';
import { parseStatusDetailPage } from '../utils/parsingWorkerStatusDetail';

export interface StatusDetailPageInfo {
  data: HitDatabaseMap;
  morePages: boolean;
}

/**
 * @param encodedDate in 'YYYY-MM-DD' format.
 */
export const fetchStatusDetailPage = async (encodedDate: string, page = 1) => {
  try {
    const response = await axios.get<Document>(
      `${API_URL}/status_details/${encodedDate}`,
      {
        responseType: 'document'
      }
    );
    return parseStatusDetailPage(response.data, encodedDate);
  } catch (e) {
    throw Error('Problem fetching status detail: ' + e);
  }
};
