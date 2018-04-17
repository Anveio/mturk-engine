const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

export const formatAsUsd = currencyFormatter.format;

/**
 * Trims leading and trailing whitespace and line terminators and replaces all
 * characters after character 90 with an ellipsis.
 * @param str
 */
export const truncate = (str: string, max = 90): string => {
  const trimmed = str.trim();
  return trimmed.length > max ? trimmed.slice(0, max).concat(' ...') : trimmed;
};

export const removeCurrencyFormatting = (input: string) =>
  input.replace(/[^\d.]/g, '');

export const pluralize = (
  nonPluralForm: string,
  pluralForm = nonPluralForm + 's'
) => (groupSize = 2) => (groupSize === 1 ? nonPluralForm : pluralForm);
