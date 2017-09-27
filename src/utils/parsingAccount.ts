import { AccountInfo } from '../types';
import { workerIdSelector, userNameSpan } from '../constants/querySelectors';

export const parseWorkerId = (input: Document): string => {
  const workerIDElem = input.querySelector(workerIdSelector);
  return workerIDElem && workerIDElem.textContent
    ? workerIDElem.textContent.trim()
    : '[Error:AccountID]';
};

export const parseFullName = (input: Document): string => {
  const fullNameElem = input.querySelector(userNameSpan);
  return fullNameElem && fullNameElem.textContent
    ? fullNameElem.textContent.trim()
    : '[Error:name]';
};

export const generateAccountInfo = (input: Document): AccountInfo => ({
  id: parseWorkerId(input),
  fullName: parseFullName(input)
});
