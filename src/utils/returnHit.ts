import axios from 'axios';
import { API_URL } from '../constants';
import { stringToDomElement } from './parsing';

export const returnHit = async (hitId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/mturk/return?hitId=${hitId}&inPipeline=false`
    );
    const rawHtml: string = response.data;
    return validateHitReturn(rawHtml);
  } catch (e) {
    return false;
  }
};

export type HitReturnStatus = 'repeat' | 'success' | 'error';

const validateHitReturn = (html: string): HitReturnStatus => {
  const table = stringToDomElement(html);
  const alertBox = findAlertBox(table);
  return alertBox ? validateAlertBoxText(alertBox) : 'error';
};

const findAlertBox = (el: HTMLTableElement) => {
  const alertBox = el.querySelector('span#alertBoxHeader');
  return alertBox ? alertBox as HTMLSpanElement : false;
};

const validateAlertBoxText = (el: HTMLSpanElement): HitReturnStatus => {
  const text = el.innerText.trim();
  switch (text) {
    case 'The HIT has been returned.':
      return 'success';
    case 'You have already returned this HIT.':
      return 'repeat';
    default:
      return 'error';
  }
};
