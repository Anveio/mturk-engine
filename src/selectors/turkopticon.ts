import { createSelector } from 'reselect';
import { Map } from 'immutable';
import {
  RootState,
  SearchResults,
  SearchResult,
  AttributeWeights
} from '../types';
import {
  hasAValidScore,
  calculateWeightedAverageScore
} from '../utils/turkopticon';
import { searchResultSelector, turkopticonSettingsSelector } from './index';

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
  [searchResultSelector, hideNoToEnabled],
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

export const searchResultsToWeightedToMap = createSelector(
  [searchResultSelector, attributeWeightsSelector],
  (results, weights) =>
    results.map((hit: SearchResult) => {
      const { turkopticon } = hit.requester;
      if (!turkopticon) {
        return null;
      }

      return calculateWeightedAverageScore(turkopticon.scores, weights);
    })
);

export const filterBelowTOThreshold = createSelector(
  [
    useUserFilterNoTOsetting,
    searchResultsToWeightedToMap,
    minWeightedTopticonScore,
    minTopticonScoreEnabled
  ],
  (
    hits: SearchResults,
    weightedToMap: Map<string, number | null>,
    minScore: number,
    minToEnabled: boolean
  ) => {
    /**
     * High complexity code. Todo: separate these into individual selectors and compose them instead of this.
     * Basically: does nothing if setting isn't enabled, but if it is...
     * Keeps HITs with TO above minimum score or if it has no reviews at all.
     */
    if (minToEnabled) {
      return hits.filter((hit: SearchResult): boolean => {
        if (!hit.requester.turkopticon) {
          return true;
        }

        const averageScore = weightedToMap.get(hit.groupId);
        return averageScore ? averageScore >= minScore : true;
      });
    } else {
      return hits;
    }
  }
);
