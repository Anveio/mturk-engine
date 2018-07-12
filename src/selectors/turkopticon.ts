import { createSelector } from 'reselect';
import { Map } from 'immutable';
import {
  RootState,
  SearchResults,
  SearchResult,
  AttributeWeights,
  Requester
} from '../types';
import {
  hasAValidScore,
  calculateWeightedAverageScore,
  sortByWeightedTo
} from '../utils/turkopticon';
import {
  searchResultsSelector,
  turkopticonSettingsSelector,
  loggedRequestersSelector
} from './index';

export const minTopticonScoreEnabled = createSelector(
  [turkopticonSettingsSelector],
  settings => settings.hideBelowThresholdEnabled
);

export const hideNoToEnabled = createSelector(
  [turkopticonSettingsSelector],
  settings => settings.hideNoToEnabled
);

export const minWeightedTopticonScore = createSelector(
  [turkopticonSettingsSelector],
  settings => settings.minimumWeightedTO
);

export const attributeWeightsSelector = (
  state: RootState
): AttributeWeights => ({
  commWeight: state.topticonSettings.commWeight,
  fairWeight: state.topticonSettings.fairWeight,
  fastWeight: state.topticonSettings.fastWeight,
  payWeight: state.topticonSettings.payWeight
});

export const useUserFilterNoTOsetting = createSelector(
  [searchResultsSelector, hideNoToEnabled],
  (hits: SearchResults, enabled: boolean) => {
    return enabled
      ? hits.filter(
          (hit: SearchResult) =>
            !!hit.requester.turkopticon &&
            hasAValidScore(hit.requester.turkopticon.scores)
        )
      : hits;
  }
);

export const requestersToWeightedToMap = createSelector(
  [loggedRequestersSelector, attributeWeightsSelector],
  (requesters, weights) =>
    requesters.map((requester: Requester) => {
      const { turkopticon } = requester;
      if (!turkopticon) {
        return null;
      }

      return calculateWeightedAverageScore(turkopticon.scores, weights);
    })
);

export const filterBelowTopticonThreshold = createSelector(
  [
    useUserFilterNoTOsetting,
    requestersToWeightedToMap,
    minWeightedTopticonScore,
    minTopticonScoreEnabled
  ],
  (
    hits: SearchResults,
    weightedToMap: Map<string, number | null>,
    minScore: number,
    minToEnabled: boolean
  ) => {
    if (!minToEnabled) {
      return hits;
    }

    return hits.filter(sortByWeightedTo(weightedToMap, minScore));
  }
);
