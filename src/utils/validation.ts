export const validateInbounds = (value: string) => {
  const num = parseFloat(value);
  return num >= 0 && num <= 100;
};

export const validateInteger = (value: string): boolean => /^\d+$/.test(value);

export const validateNumber = (value: string): boolean =>
  !isNaN(parseFloat(value)) && isFinite(parseFloat(value));

export const validateRejectionThreshold = (value: string) =>
  (validateInbounds(value) && validateInteger(value)) || value === '';
