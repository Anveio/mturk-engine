const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

const numberFormatter = new Intl.NumberFormat('en-US');

/**
 * Trims leading and trailing whitespace and line terminators and replaces all 
 * characters after character 90 with an ellipsis.
 * @param str
 */
export const truncate = (str: string, max = 90): string => {
  const trimmed = str.trim();
  return trimmed.length > max ? trimmed.slice(0, max).concat(' ...') : trimmed;
};

type Variation = 'positive' | 'negative' | 'strong' | 'subdued';

export const rewardToVariation = (reward: string): Variation => {
  const amount = parseFloat(reward);
  if (amount >= 1.0) {
    return 'strong';
  } else {
    return 'subdued';
  }
};

export const formatAsCurrency = currencyFormatter.format;

export const formatNumWithCommas = numberFormatter.format;

export const removeCurrencyFormatting = (input: string) =>
  input.replace(/[^\d.]/g, '');
