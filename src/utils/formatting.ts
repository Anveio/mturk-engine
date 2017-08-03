/**
 * Trims leading and trailing whitespace and line terminators and replaces all 
 * characters after character 90 with an ellipsis.
 * @param str
 */
export const truncate = (str: string): string => {
  const trimmed = str.trim();
  return trimmed.length > 90 ? trimmed.slice(0, 89).concat(' ...') : trimmed;
};
