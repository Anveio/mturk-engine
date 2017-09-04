import { SearchResult, SortingOption } from '../types';

const optionsMap = {
  'Batch Size': 'batchSize',
  Reward: 'reward',
  Latest: 'index',
  default: 'index'
};

export const sortBy = (option: SortingOption) => {
  const property = optionsMap[option] || optionsMap.default;
  return (a: SearchResult, b: SearchResult) => +b[property] - +a[property];
};
