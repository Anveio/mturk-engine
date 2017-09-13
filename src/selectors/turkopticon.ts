import { createSelector } from 'reselect';
import { RootState, SearchResults, SearchResult } from '../types';
// import { searchResultSelector } from './searchTable';
import { calculateAverageScore } from '../utils/turkopticon';

export const minTopticonScoreEnabled = (state: RootState) =>
  state.topticonSettings.hideBelowThresholdEnabled;

export const minWeightedTopticonScore = (state: RootState) =>
  state.topticonSettings.minimumWeightedTO;

/**
 * Keeps HITs that don't have any scores.
 */
export const filterBelowTOThreshold = createSelector(
  [ (state: RootState) => state.search, minWeightedTopticonScore ],
  (hits: SearchResults, minScore: number) =>
    hits.filter((hit: SearchResult): boolean => {
      if (!hit.requester.turkopticon) {
        return true;
      } else {
        const averageScore = calculateAverageScore(
          hit.requester.turkopticon.attrs
        );
        return averageScore ? averageScore >= minScore : true;
      }
    })
);
