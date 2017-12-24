import { SearchResult, SortingOption } from '../types';

/**
 * Translates UI text into the associated property
 */
const optionsMap = {
  'Batch Size': 'batchSize',
  'Unread First': 'markedAsRead',
  Reward: 'reward',
  Latest: 'creationTime',
  default: 'creationTime'
};

type SortOrder = 'ascending' | 'descending';

interface SortOrderMap {
  [key: string]: SortOrder;
}

/**
 * Translates a natural language sorting term into ascending or descending.
 */
const sortOrderMap: SortOrderMap = {
  'Batch Size': 'descending',
  'Unread First': 'ascending',
  Reward: 'descending',
  Latest: 'descending',
  default: 'ascending'
};

const calculateSortOrder = (option: SortingOption): SortOrder =>
  sortOrderMap[option];

export const sortBy = (option: SortingOption) => {
  if (option === 'Weighted T.O.') {
    return sortByTurkopticonRating;
  }

  const property = optionsMap[option] || optionsMap.default;
  const sortOrder = calculateSortOrder(option);
  if (sortOrder === 'descending') {
    return (a: SearchResult, b: SearchResult) => +b[property] - +a[property];
  } else {
    return (a: SearchResult, b: SearchResult) => +a[property] - +b[property];
  }
};

export const sortByTurkopticonRating = (a: SearchResult, b: SearchResult) => {
  if (!a.requester.turkopticon) {
    return 1;
  } else if (!b.requester.turkopticon) {
    return -1;
  } else {
    const aAverage = a.requester.turkopticon.unweightedAverageScore;
    const bAverage = b.requester.turkopticon.unweightedAverageScore;

    if (!aAverage) {
      return 1;
    } else if (!bAverage) {
      return -1;
    } else {
      return bAverage - aAverage;
    }
  }
};
