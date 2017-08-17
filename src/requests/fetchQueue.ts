import { Dispatch } from 'react-redux';
import { Hit, Requester } from '../types';
import { Map } from 'immutable';
import {
  HitPageAction,
  getHitPageSuccess,
  getHitPageFailure
} from '../actions/hits';
import {
  TOpticonAction,
  fetchTOpticonSuccess,
  fetchTOpticonFailure
} from '../actions/turkopticon';
import { batchFetchTOpticon, hitMapToRequesterIdsArray } from '../utils/turkopticon';

export type FetchAction = HitPageAction | TOpticonAction;

export const queryMturkAndTOpticon = (
  dispatch: Dispatch<FetchAction>
) => async () => {
  /**
   * Credit to: https://www.bignerdranch.com/blog/cross-stitching-elegant-concurrency-patterns-for-javascript/
   */
  const fetchHits = (async () => {
    try {
      const hitData = await Promise.resolve(Map<string, Hit>());
      hitData.isEmpty()
        ? dispatch(getHitPageFailure())
        : dispatch(getHitPageSuccess(hitData));
      return hitData;
    } catch (e) {
      /**
       * Return an empty set on error to simplify function signature.
       */
      dispatch(getHitPageFailure());
      return Map<string, Hit>();
    }
  })();

  const fetchTopticonData = (async () => {
    try {
      /**
       * We cannot know what to query Turkopticon with until fetchHits resolves.
       * After fetchHits resolves we query Turkopticon with the ids of each 
       * requester returned by fetchHits.
       */
      const hits = await fetchHits;
      if (hits.isEmpty()) {
        /**
         * Immediately exit without sending network request 
         * and return an empty map to simply function signature.
         */
        return Map<string, Requester>();
      }
      const requesterIds = hitMapToRequesterIdsArray(hits);
      return await batchFetchTOpticon(requesterIds);
    } catch (e) {
      dispatch(fetchTOpticonFailure());
      return Map<string, Requester>();
    }
  })();

  const topticonData = await fetchTopticonData;
  topticonData && !topticonData.isEmpty()
    ? dispatch(fetchTOpticonSuccess(topticonData))
    : dispatch(fetchTOpticonFailure());
};
