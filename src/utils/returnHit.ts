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

const validateHitReturn = (html: string): boolean => {
  const table = stringToDomElement(html);
  const alertBox = findAlertBox(table);
  return alertBox ? validateAlertBoxText(alertBox) : false;
};

const findAlertBox = (el: HTMLTableElement) => {
  const alertBox = el.querySelector('span#alertBoxHeader');
  return alertBox ? alertBox as HTMLSpanElement : false;
};

const validateAlertBoxText = (el: HTMLSpanElement) => {
  return el.innerText.trim() === 'The HIT has been returned.';
};
