import axios from 'axios';
import { API_URL } from '../constants';
import { stringToDomElement } from './parsing';

export const sendReturnHitRequest = async (hitId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/mturk/return?hitId=${hitId}&inPipeline=false`
    );
    const rawHtml: string = response.data;
    return validateHitReturn(rawHtml);
  } catch (e) {
    return 'error';
  }
};

export type HitReturnStatus = 'repeat' | 'success' | 'error';

const validateHitReturn = (html: string): HitReturnStatus => {
  const table = stringToDomElement(html);
  const alertBox = table.querySelector('#alertboxHeader')
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
