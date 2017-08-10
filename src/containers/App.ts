import { connect, Dispatch } from 'react-redux';
import App, { Handlers } from '../components/App';
import { Hit, Requester } from '../types';
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
import { batchFetchHits } from '../utils/fetchHits';
import { batchFetchTOpticon, hitMapToRequesterIdsArray } from '../utils/turkopticon';
import { Map } from 'immutable';

type AppAction = HitPageAction | TOpticonAction;

const mapDispatch = (dispatch: Dispatch<AppAction>): Handlers => ({
  /**
   * Credit to: https://www.bignerdranch.com/blog/cross-stitching-elegant-concurrency-patterns-for-javascript/
   */
  onFetch: async () => {
    const fetchHits = (async () => {
      try {
        const hitData = await batchFetchHits();
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
        const requesterIds = hitMapToRequesterIdsArray(hits);
        return await batchFetchTOpticon(requesterIds);
      } catch (e) {
        dispatch(fetchTOpticonFailure());
        return Map<string, Requester>();
      }
    })();

    const topticonData = await fetchTopticonData;
    topticonData
      ? dispatch(fetchTOpticonSuccess(topticonData))
      : dispatch(fetchTOpticonFailure());
  }
});

export default connect(null, mapDispatch)(App);
