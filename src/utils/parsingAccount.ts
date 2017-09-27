import { AccountInfo } from '../types';
import { workerIdSelector } from '../constants/querySelectors';

export const parseWorkerId = (input: Document): string => {
  const workerIDElem = input.querySelector(workerIdSelector);
  return workerIDElem && workerIDElem.textContent
    ? workerIDElem.textContent.trim()
    : '[Error:AccountID]';
};

export const generateAccountInfo = (input: Document): AccountInfo => ({
  id: parseWorkerId(input)
});
