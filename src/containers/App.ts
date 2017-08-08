import { HitPageAction, getHitPageSuccess } from '../actions/hits';
import { TOpticonAction, fetchTOpticonSuccess } from '../actions/turkopticon';
import { connect, Dispatch } from 'react-redux';

import App, { Handlers } from '../components/App';
import { batchFetchHits } from '../utils/fetchHits';
import {
  batchFetchTOpticon,
  noTurkopticon,
  selectRequesterId
} from '../utils/turkopticon';

type AppAction = HitPageAction | TOpticonAction;

const mapDispatch = (dispatch: Dispatch<AppAction>): Handlers => ({
  /**
   * Credit to: https://www.bignerdranch.com/blog/cross-stitching-elegant-concurrency-patterns-for-javascript/
   */
  onFetch: async () => {
    const fetchHits = (async () => await batchFetchHits())();

    const fetchTOpticon = (async () => {
      const hits = await fetchHits;
      return await batchFetchTOpticon(
        hits.filter(noTurkopticon).map(selectRequesterId)
      );
    })();

    const hitData = await fetchHits;
    const topticonData = await fetchTOpticon;

    dispatch(getHitPageSuccess(hitData));
    dispatch(fetchTOpticonSuccess(topticonData));
  }
});

export default connect(null, mapDispatch)(App);
