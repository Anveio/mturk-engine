import { SearchItem, SortingOption } from '../types';

const optionsMap = {
  'Batch Size': 'batchSize',
  Reward: 'reward',
  Latest: 'time',
  default: 'time'
};

export const sortBy = (option: SortingOption) => {
  const property = optionsMap[option] || optionsMap.default;
  return (a: SearchItem, b: SearchItem) => +b[property] - +a[property];
};
