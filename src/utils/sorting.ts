import {
  SearchResult,
  SortingOption,
  AttributeWeights,
  WatcherFolder,
  Watcher
} from '../types';
import { calculateWeightedAverageScore } from './turkopticon';

interface OptionsMap {
  [key: string]: keyof Pick<
    SearchResult,
    'batchSize' | 'reward' | 'creationTime'
  >;
}

/**
 * Translates UI text into the associated property
 */
const optionsMap: OptionsMap = {
  'Batch Size': 'batchSize',
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

export const sortBy = (option: SortingOption, weights: AttributeWeights) => {
  if (option === 'Weighted T.O.') {
    return sortByTurkopticonRating(weights);
  }

  const property = optionsMap[option] || optionsMap.default;
  const sortOrder = calculateSortOrder(option);
  if (sortOrder === 'descending') {
    return (a: SearchResult, b: SearchResult) => +b[property] - +a[property];
  } else {
    return (a: SearchResult, b: SearchResult) => +a[property] - +b[property];
  }
};

export const sortByTurkopticonRating = (weights: AttributeWeights) => (
  a: SearchResult,
  b: SearchResult
) => {
  /**
   * Handle the case where one of the requesters Has no T.O data.
   */
  if (!a.requester.turkopticon) {
    return 1;
  } else if (!b.requester.turkopticon) {
    return -1;
  }

  const aAverage = calculateWeightedAverageScore(
    a.requester.turkopticon.scores,
    weights
  );
  const bAverage = calculateWeightedAverageScore(
    b.requester.turkopticon.scores,
    weights
  );

  /**
   * Handle the case where, after applying weights, average T.O is null.
   */
  if (aAverage === null) {
    return 1;
  } else if (bAverage === null) {
    return -1;
  }

  return bAverage - aAverage;
};

export const sortWatcherFoldersNewestFirst = (
  a: WatcherFolder,
  b: WatcherFolder
) => a.dateNumCreation - b.dateNumCreation;

export const sortWatchersNewestFirst = (a: Watcher, b: Watcher) =>
  b.createdOn.valueOf() - a.createdOn.valueOf();
