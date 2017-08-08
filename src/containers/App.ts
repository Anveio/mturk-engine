import { connect, Dispatch } from 'react-redux';
import App, { Handlers } from '../components/App';
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
import { batchFetchTOpticon, hitSetToRequesterIdsArray } from '../utils/turkopticon';
import { Set } from 'immutable';

type AppAction = HitPageAction | TOpticonAction;

const mapDispatch = (dispatch: Dispatch<AppAction>): Handlers => ({
  /**
   * Credit to: https://www.bignerdranch.com/blog/cross-stitching-elegant-concurrency-patterns-for-javascript/
   */
  onFetch: async () => {
    const fetchHits = (async () => {
      try {
        const hitData = await batchFetchHits();
        hitData
          ? dispatch(getHitPageSuccess(hitData))
          : dispatch(getHitPageFailure());
        return hitData;
      } catch (e) {
        /**
         * Return an empty set on error to simplify function signature.
         */
        dispatch(getHitPageFailure());
        return Set([]);
      }
    })();

    (async () => {
      try {
        const hits = await fetchHits;
        const requesterIds = hitSetToRequesterIdsArray(hits);
        const topticonData = await batchFetchTOpticon(requesterIds);
        topticonData
          ? dispatch(fetchTOpticonSuccess(topticonData))
          : dispatch(fetchTOpticonFailure());
      } catch (e) {
        dispatch(fetchTOpticonFailure());
      }
    })();
  }
});

export default connect(null, mapDispatch)(App);
