import { pandaLinkValidators, projectIdFromProjectLinkRegex } from './watchers';
import { executeRegex } from './parsing';

export const validateInbounds = (value: string) => {
  const num = parseFloat(value);
  return num >= 0 && num <= 100;
};

export const validateIntegerString = (value: string): boolean =>
  /^\d+$/.test(value);

export const validateNumber = (value: string): boolean =>
  !Number.isNaN(parseFloat(value)) && Number.isFinite(parseFloat(value));

export const validatePositiveNumber = (value: string): boolean =>
  validateNumber(value) && parseFloat(value) >= 0;

export const validateRejectionThreshold = (value: string) =>
  (validateInbounds(value) && validateIntegerString(value)) || value === '';

export const validatePersistedStateKey = (key: string) =>
  key.startsWith('reduxPersist:') && !!/reduxPersist:(.*)/g.exec(key);

export const selectReduxPersistStateKey = (key: string) =>
  (/reduxPersist:(.*)/g.exec(key) as RegExpExecArray)[1];

export const validateInputPandaLink = (input: string): boolean => {
  try {
    return pandaLinkValidators
      .map(fn => fn(input))
      .every((el: boolean) => el === true);
  } catch (e) {
    return false;
  }
};

export const validateProjectIdLink = (input: string): boolean => {
  try {
    const groupId = executeRegex(input)(projectIdFromProjectLinkRegex);
    return groupId.length === 30 ? true : false;
  } catch (e) {
    return false;
  }
};
