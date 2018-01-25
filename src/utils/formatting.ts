const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

/**
 * Trims leading and trailing whitespace and line terminators and replaces all
 * characters after character 90 with an ellipsis.
 * @param str
 */
export const truncate = (str: string, max = 90): string => {
  const trimmed = str.trim();
  return trimmed.length > max ? trimmed.slice(0, max).concat(' ...') : trimmed;
};

export const formatAsCurrency = currencyFormatter.format;

export const removeCurrencyFormatting = (input: string) =>
  input.replace(/[^\d.]/g, '');

export const pluralize = (input: string, size = 2) =>
  `${input}${size > 1 ? 's' : ''}`;
