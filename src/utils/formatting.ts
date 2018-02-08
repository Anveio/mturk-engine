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

/**
 * Creates a pluralize function that accepts an amount then returns the
 * appropriate plural form or non-plural form
 * @param nonPluralForm
 * @param pluralForm
 */
export const pluralize = (nonPluralForm: string, pluralForm: string) => (
  groupSize = 2
) => (groupSize === 1 ? nonPluralForm : pluralForm);

expect(pluralize('goose', 'geese')(0)).toBe('geese');
expect(pluralize('goose', 'geese')());

// Thunked
const pluralizeGeese = pluralize('goose', 'geese');

expect(pluralizeGeese(0)).toBe('geese');
expect(pluralizeGeese());
