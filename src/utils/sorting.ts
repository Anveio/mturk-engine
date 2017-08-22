import { SearchItem, SortingOption } from '../types';

const optionsMap = {
  'Batch Size': 'batchSize',
  Reward: 'reward',
  default: 'time'
};

export const sortBy = (option: SortingOption) => {
  const property = optionsMap[option] || optionsMap.default;
  return (a: SearchItem, b: SearchItem) => +b[property] - +a[property];
};

// type SearchItemProperty = 'batchSize' | 'reward' | 'time';
