/**
 * Trims leading and trailing whitespace and line terminators and replaces all 
 * characters after character 90 with an ellipsis.
 * @param str
 */
export const truncate = (str: string, max = 90): string => {
  const trimmed = str.trim();
  return trimmed.length > max ? trimmed.slice(0, 89).concat(' ...') : trimmed;
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
