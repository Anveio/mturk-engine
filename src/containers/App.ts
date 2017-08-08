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

type AppAction = HitPageAction | TOpticonAction;

const mapDispatch = (dispatch: Dispatch<AppAction>): Handlers => ({
  /**
   * Credit to: https://www.bignerdranch.com/blog/cross-stitching-elegant-concurrency-patterns-for-javascript/
   */
  onFetch: async () => {
    const fetchHits = (async () => {
      const hitData = await batchFetchHits();
      hitData ? dispatch(getHitPageSuccess(hitData)) : dispatch(getHitPageFailure());
      return hitData;
    })();

    const fetchTOpticon = (async () => {
      const hits = await fetchHits;
      const requesterIds = hitSetToRequesterIdsArray(hits);
      return await batchFetchTOpticon(requesterIds);
    })();

    const topticonData = await fetchTOpticon;
    topticonData
      ? dispatch(fetchTOpticonSuccess(topticonData))
      : dispatch(fetchTOpticonFailure());
  }
});

export default connect(null, mapDispatch)(App);
