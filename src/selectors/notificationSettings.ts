import { createSelector } from 'reselect';
import {
  notificationSettingsSelector,
  loggedSearchResultsSelector
} from './index';
import { newResults } from './search';
import { SearchResult, SearchResults } from '../types';

const filterNewSearchResultsQualifiedOnly = createSelector(
  [newResults],
  (results: SearchResults) => {
    return results.filter((result: SearchResult) => result.qualified);
  }
);

const newNeverLoggedSearchResults = createSelector(
  [filterNewSearchResultsQualifiedOnly, loggedSearchResultsSelector],
  (results: SearchResults, loggedResults: SearchResults) =>
    results.filter((result: SearchResult) => !loggedResults.get(result.groupId))
);

const unreadSearchResultsAboveNotificationThreshold = createSelector(
  [newNeverLoggedSearchResults, notificationSettingsSelector],
  (results, settings) =>
    results.filter(
      (result: SearchResult) => result.reward >= settings.minReward
    )
);

/**
 * Users can receive 1 desktop notifications at a time.
 * So send notifications for only the highest paying HIT.
 */
export const topPayingResultSuitableForNotification = createSelector(
  [unreadSearchResultsAboveNotificationThreshold],
  results =>
    results
      .sort((a, b) => b.reward - a.reward)
      .slice(0, 1)
      .toList()
      .get(0) as SearchResult | undefined
);
