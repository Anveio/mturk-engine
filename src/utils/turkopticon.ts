import axios from 'axios';
import { turkopticonApiMulti } from '../constants';

export const fetchRequesterTO = async (requesterIds: string[]) => {
  /**
   * Potentially unsafe: We're relying on javascript's built-in type coercion of 
   * arrays to strings, which automatically appends a comma between array elements,
   * to build our query string.
   */
  return await axios.get(turkopticonApiMulti + requesterIds).then(
    response => {
      const data: TurkopticonApiResponse = response.data;
      return Object.keys(data).map(requester => ({
        id: requester,
        ...data[requester]
      })) as RequesterDetails[];
    },
    reject => {
      return null;
    }
  );
};