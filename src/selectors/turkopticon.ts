import { createSelector } from 'reselect';
import { RootState, SearchResults, SearchResult } from '../types';
import { hideBlockedRequestersAndHits } from './searchTable';
import { calculateAverageScore } from '../utils/turkopticon';

const minTopticonScoreEnabled = (state: RootState) =>
  state.topticonSettings.hideBelowThresholdEnabled;

const minWeightedTopticonScore = (state: RootState) =>
  state.topticonSettings.minimumWeightedTO;

/**
 * Keeps HITs that don't have any scores.
 */
export const filterBelowTOThreshold = createSelector(
  [ hideBlockedRequestersAndHits, minWeightedTopticonScore ],
  (hits: SearchResults, minScore: number) =>
    hits.filter((hit: SearchResult) => {
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
