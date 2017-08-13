import { connect, Dispatch } from 'react-redux';
import App, { Props, Handlers } from '../components/App';
import { RootState, Hit, Requester, SearchOptions } from '../types';
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

const mapState = (state: RootState): Props => ({
  hits: state.hits,
  requesters: state.requesters,
  options: state.searchOptions
});

const mapDispatch = (dispatch: Dispatch<AppAction>): Handlers => ({
  /**
   * Credit to: https://www.bignerdranch.com/blog/cross-stitching-elegant-concurrency-patterns-for-javascript/
   */
  onFetch: async (options: SearchOptions) => {
    const fetchHits = (async () => {
      try {
        const hitData = await batchFetchHits(options);
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
  }
});

export default connect(mapState, mapDispatch)(App);
