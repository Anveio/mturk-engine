import { connect, Dispatch } from 'react-redux';
import { RootState } from '../types';
import HitTable, { Props, Handlers } from '../components/HitTable/HitTable';
import { queryMturkAndTOpticon, FetchAction } from '../requests/fetchData';

const mapState = (state: RootState): Props => ({
  hits: state.hits,
  requesters: state.requesters,
  options: state.searchOptions
});

const mapDispatch = (dispatch: Dispatch<FetchAction>): Handlers => ({
  onFetch: queryMturkAndTOpticon(dispatch)
});

export default connect(mapState, mapDispatch)(HitTable);
