import { AccountInfo } from '../types';
import {
  workerIdSelector,
  userNameSpan,
  availableEarnings,
  lifetimeSubmitted,
  lifetimeHitEarnings,
  lifetimeBonusEarnings,
  lifetimeTotalEarnings,
  lifetimeApproved,
  lifetimeRejected,
  numPending
} from '../constants/querySelectors';
import {
  parseStringProperty,
  parseCurrencyProperty,
  parseNumericProperty
} from './parsing';

export const generateAccountInfo = (input: Document): AccountInfo => ({
  id: parseWorkerId(input),
  fullName: parseStringProperty(userNameSpan, 'name')(input),
  availableEarnings: parseCurrencyProperty(availableEarnings)(input),
  lifetimeBonusEarnings: parseCurrencyProperty(lifetimeBonusEarnings)(input),
  lifetimeHitEarnings: parseCurrencyProperty(lifetimeHitEarnings)(input),
  lifetimeTotalEarnings: parseCurrencyProperty(lifetimeTotalEarnings)(input),
  lifetimeApproved: parseNumericProperty(lifetimeApproved)(input),
  lifetimeRejected: parseNumericProperty(lifetimeRejected)(input),
  lifetimeSubmitted: parseNumericProperty(lifetimeSubmitted)(input),
  numPending: parseNumericProperty(numPending)(input)
});

const parseWorkerId = (input: Document): string => {
  const workerIDElem = input.querySelector(workerIdSelector);
  return workerIDElem && workerIDElem.textContent
    ? workerIDElem.textContent.split('ID: ')[1].trim()
    : '[Error:AccountID]';
};
