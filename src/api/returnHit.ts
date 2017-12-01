import axios from 'axios';
import { API_URL } from '../constants';

export type HitReturnStatus = 'repeat' | 'success' | 'error';

export const sendReturnHitRequest = async (hitId: string) => {
  try {
    const response = await axios.get<Document>(`${API_URL}/mturk/return`, {
      params: {
        hitId,
        inPipeline: false
      },
      responseType: 'document'
    });
    const documentResponse = response.data;
    return validateHitReturn(documentResponse);
  } catch (e) {
    throw new Error('Unknown problem with returning Hit.');
  }
};

const validateHitReturn = (html: Document): HitReturnStatus => {
  const noAssignedHitsContainer = html.querySelector('td.error_title');

  if (!!noAssignedHitsContainer) {
    return 'success';
  }

  const alertBox = html.querySelector('#alertboxHeader');
  return !!alertBox ? validateAlertBoxText(alertBox) : 'error';
};

const validateAlertBoxText = (el: Element | undefined): HitReturnStatus => {
  if (el === undefined) {
    return 'error';
  }

  const text = (el as HTMLSpanElement).innerText.trim();
  switch (text) {
    case 'The HIT has been returned.':
      return 'success';
    case 'You have already returned this HIT.':
      return 'repeat';
    default:
      return 'error';
  }
};
