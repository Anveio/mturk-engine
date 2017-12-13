import { SearchOptions, SearchSort } from '../types';
import { WorkerSearchParams, WorkerSortParam } from '../worker-mturk-api';

export const generateParams = (options: SearchOptions): WorkerSearchParams => {
  const { sortType, minReward, qualifiedOnly, searchTerm } = options;

  return {
    sort: sortParam(sortType),
    filters: {
      search_term: searchTerm,
      min_reward: parseFloat(minReward),
      qualified: qualifiedOnly
    },
    page_size: 100,
    page_number: 1
  };
};

const sortParam = (sorting: SearchSort): WorkerSortParam => {
  switch (sorting) {
    case 'Latest':
      return 'updated_asc';
    case 'Batch Size':
      return 'num_hits_desc';
    case 'Reward':
      return 'reward_desc';
    default:
      throw new Error('Problem generating sortType param');
  }
};
