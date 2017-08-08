import { RootState, Hit } from '../types';

import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions/turkopticon';
import HitTable, { Props, Handlers } from '../components/HitTable/HitTable';

import { batchFetchTOpticon, selectRequesterIds } from '../utils/turkopticon';

const mapState = (state: RootState): Props => ({
  hits: state.hits
});

const mapDispatch = (dispatch: Dispatch<actions.TOpticonAction>): Handlers => ({
  onRefresh: async (hits: Hit[]) => {
    try {
      const freshTOpticons = await batchFetchTOpticon(selectRequesterIds(hits));
      dispatch(actions.fetchTOpticonSuccess(freshTOpticons));
    } catch (e) {
      dispatch(actions.fetchTOpticonFailure());
    }
  }
});

export default connect(mapState, mapDispatch)(HitTable);
