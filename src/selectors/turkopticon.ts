import { createSelector } from 'reselect';
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

const searchResultSelector = (state: RootState) => state.search;

export const minTopticonScoreEnabled = (state: RootState) =>
  state.topticonSettings.hideBelowThresholdEnabled;

export const hideNoToEnabled = (state: RootState) =>
  state.topticonSettings.hideNoToEnabled;

export const minWeightedTopticonScore = (state: RootState) =>
  state.topticonSettings.minimumWeightedTO;

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

export const filterBelowTOThreshold = createSelector(
  [
    useUserFilterNoTOsetting,
    minWeightedTopticonScore,
    minTopticonScoreEnabled,
    attributeWeightsSelector
  ],
  (
    hits: SearchResults,
    minScore: number,
    minToEnabled: boolean,
    attributeWeights: AttributeWeights
  ) => {
    /**
     * High complexity code. Todo: separate these into individual selectors and compose them instead of this.
     * Basically: does nothing if setting isn't enabled, but if it is...
     * Keeps HITs with TO above minimum score or if it has no reviews at all.
     */
    if (minToEnabled) {
      return hits.filter((hit: SearchResult): boolean => {
        if (!hit.requester.turkopticon) {
          return false;
        }

        const averageScore = calculateWeightedAverageScore(
          hit.requester.turkopticon.scores,
          attributeWeights
        );
        return averageScore ? averageScore >= minScore : true;
      });
    } else {
      return hits;
    }
  }
);
