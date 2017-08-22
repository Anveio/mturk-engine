import { SearchItem, SortingOption } from '../types';

export const sortBy = (option: SortingOption) => {
  const property = optionToProperty(option);
  return (a: SearchItem, b: SearchItem) => +b[property] - +a[property];
};

type SearchItemProperty = 'batchSize' | 'reward';

const optionToProperty = (option: SortingOption): SearchItemProperty => {
  switch (option) {
    case 'Batch Size':
      return 'batchSize';
    case 'Reward':
      return 'reward';
    default:
      return 'reward';
  }
};
