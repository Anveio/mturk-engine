export const validateInbounds = (value: string) => {
  const num = parseFloat(value);
  return num >= 0 && num <= 100;
};

export const validateInteger = (value: string): boolean => /^\d+$/.test(value);

export const validateNumber = (value: string): boolean =>
  !Number.isNaN(parseFloat(value)) && isFinite(parseFloat(value));

export const validatePositiveNumber = (value: string): boolean =>
  validateNumber(value) && parseFloat(value) >= 0;

export const validateRejectionThreshold = (value: string) =>
  (validateInbounds(value) && validateInteger(value)) || value === '';

export const validatePersistedStateKey = (key: string) =>
  key.startsWith('reduxPersist:') && !!/reduxPersist:(.*)/g.exec(key);

export const selectReduxPersistStateKey = (key: string) =>
  (/reduxPersist:(.*)/g.exec(key) as RegExpExecArray)[1];
