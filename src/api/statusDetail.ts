import axios from 'axios';
import { HitDatabaseMap } from '../types';
import { API_URL } from '../constants';
import { encodedDateStringToDate } from '../utils/dates';
import { parseStatusDetailPage } from '../utils/parsingStatusDetail';

export interface StatusDetailPageInfo {
  data: HitDatabaseMap;
  morePages: boolean;
}

/**
 * @param encodedDateString E.g. '09222017'
 */
export const fetchStatusDetailPage = async (
  encodedDateString: string,
  page: number = 1
) => {
  try {
    const response = await axios.get(`${API_URL}/mturk/statusdetail`, {
      params: {
        encodedDate: encodedDateString,
        pageNumber: page
      },
      responseType: 'document'
    });
    const date = encodedDateStringToDate(encodedDateString);
    return parseStatusDetailPage(response.data as Document, date);
  } catch (e) {
    throw Error('Problem fetching status detail: ' + e);
  }
};
