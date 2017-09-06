import { SearchResult, SortingOption } from '../types';

type SortOrder = 'ascending' | 'descending';

const optionsMap = {
  'Batch Size': 'batchSize',
  Reward: 'reward',
  Latest: 'index',
  default: 'index'
};

interface SortOrderMap {
  [key: string]: SortOrder;
}

const sortOrderMap: SortOrderMap = {
  'Batch Size': 'descending',
  Reward: 'descending',
  Latest: 'ascending',
  default: 'ascending'
};

const calculateSortOrder = (option: SortingOption): SortOrder =>
  sortOrderMap[option];

export const sortBy = (option: SortingOption) => {
  const property = optionsMap[option] || optionsMap.default;
  const sortOrder = calculateSortOrder(option);
  if (sortOrder === 'descending') {
    return (a: SearchResult, b: SearchResult) => +b[property] - +a[property];
  } else {
    return (a: SearchResult, b: SearchResult) => +a[property] - +b[property];
  }
};
