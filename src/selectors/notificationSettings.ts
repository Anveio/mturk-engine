import { createSelector } from 'reselect';
import {
  notificationSettingsSelector,
  loggedSearchResultsSelector
} from './index';
import { newResults } from './search';
import { SearchResult, SearchResults } from '../types';

export const newNeverLoggedSearchResults = createSelector(
  [newResults, loggedSearchResultsSelector],
  (results: SearchResults, loggedResults: SearchResults) => {
    return results.filter(
      (result: SearchResult) => !loggedResults.get(result.groupId)
    );
  }
);

export const unreadSearchResultsAboveNotificationThreshold = createSelector(
  [newNeverLoggedSearchResults, notificationSettingsSelector],
  (results, settings) =>
    results.filter(
      (result: SearchResult) => result.reward >= settings.minReward
    )
);

/**
 * Users can receive 3 desktop notifications at a time.
 * So send notifications for only the 3 highest paying HITs.
 */
export const topThreePayingResultsSuitableForNotification = createSelector(
  [unreadSearchResultsAboveNotificationThreshold],
  results =>
    results.sort((a, b) => b.reward - a.reward).slice(0, 3) as SearchResults
);

export const topThreePayingResultsGroupIds = createSelector(
  [topThreePayingResultsSuitableForNotification],
  results => results.map((result: SearchResult) => result.groupId).toList()
);
