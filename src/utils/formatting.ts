export const truncate = (str: string): string => {
  const trimmed = str.trim();
  return trimmed.length > 90 ? trimmed.slice(0, 89).concat(' ...') : trimmed;
};
