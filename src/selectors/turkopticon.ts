import { createSelector } from 'reselect';
import { RootState, SearchResults, SearchResult } from '../types';
// import { searchResultSelector } from './searchTable';
import { calculateAverageScore } from '../utils/turkopticon';

export const minTopticonScoreEnabled = (state: RootState) =>
  state.topticonSettings.hideBelowThresholdEnabled;

export const minWeightedTopticonScore = (state: RootState) =>
  state.topticonSettings.minimumWeightedTO;

export const filterBelowTOThreshold = createSelector(
  [
    (state: RootState) => state.search,
    minWeightedTopticonScore,
    minTopticonScoreEnabled
  ],
  (hits: SearchResults, minScore: number, enabled: boolean) => {
    /**
     * High complexity code. Todo: separate these into individual selectors and compose them instead of this.
     * Basically: does nothing if setting isn't enabled, but if it is...
     * Keeps HITs with TO above minimum score or if it has no reviews at all.
     */
    if (enabled) {
      return hits.filter((hit: SearchResult): boolean => {
        if (!hit.requester.turkopticon) {
          return true;
        } else {
          const averageScore = calculateAverageScore(
            hit.requester.turkopticon.attrs
          );
          return averageScore ? averageScore >= minScore : true;
        }
      });
    } else {
      return hits;
    }
  }
);
