export const calculateMaxPage = (numResults: number, resultsPerPage: number) =>
  Math.ceil(numResults / resultsPerPage) - 1;

export const calculateHasPrevious = (page: number) => page > 0;

export const calculateHasNext = (
  page: number,
  numResults: number,
  resultsPerPage: number
) => page < calculateMaxPage(numResults, resultsPerPage);
