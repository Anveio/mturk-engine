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
import { removeCurrencyFormatting } from './formatting';

export const generateAccountInfo = (input: Document): AccountInfo => ({
  id: parseWorkerId(input),
  fullName: parseFullName(input),
  availableEarnings: parseCurrencyAccountProp(availableEarnings)(input),
  lifetimeBonusEarnings: parseCurrencyAccountProp(lifetimeBonusEarnings)(input),
  lifetimeHitEarnings: parseCurrencyAccountProp(lifetimeHitEarnings)(input),
  lifetimeTotalEarnings: parseCurrencyAccountProp(lifetimeTotalEarnings)(input),
  lifetimeApproved: parseNumericAccountProp(lifetimeApproved)(input),
  lifetimeRejected: parseNumericAccountProp(lifetimeRejected)(input),
  lifetimeSubmitted: parseNumericAccountProp(lifetimeSubmitted)(input),
  numPending: parseNumericAccountProp(numPending)(input)
});

const parseWorkerId = (input: Document): string => {
  const workerIDElem = input.querySelector(workerIdSelector);
  return workerIDElem && workerIDElem.textContent
    ? workerIDElem.textContent.split('ID: ')[1].trim()
    : '[Error:AccountID]';
};

const parseFullName = (input: Document): string => {
  const fullNameElem = input.querySelector(userNameSpan);
  return fullNameElem && fullNameElem.textContent
    ? fullNameElem.textContent.trim()
    : '[Error:name]';
};

const parseNumericAccountProp = (queryString: string) => (
  input: Document
): number => {
  const maybeElem = input.querySelector(queryString);
  return maybeElem && maybeElem.textContent
    ? parseFloat(maybeElem.textContent)
    : 0;
};

const parseCurrencyAccountProp = (queryString: string) => (
  input: Document
): number => {
  const maybeElem = input.querySelector(queryString);
  return maybeElem && maybeElem.textContent
    ? parseFloat(removeCurrencyFormatting(maybeElem.textContent))
    : 0;
};
