import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions/turkopticon';
import HitTable, { Props, Handlers } from '../components/HitTable/HitTable';

import { batchFetchTOpticon, selectRequesterIds } from '../utils/turkopticon';

const mapState = (state: RootState): Props => ({
  hits: state.hits
});

const mapDispatch = (dispatch: Dispatch<actions.TOpticonAction>): Handlers => ({
  onRefresh: async (hits: HitTableEntry[]) => {
    const freshTOpticons = await batchFetchTOpticon(selectRequesterIds(hits));
    console.log(freshTOpticons);
    const x = new Map();
    freshTOpticons
      ? dispatch(actions.fetchTOpticonSuccess(x))
      : dispatch(actions.fetchTOpticonFailure());
  }
});

export default connect(mapState, mapDispatch)(HitTable);
