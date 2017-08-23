import { connect, Dispatch } from 'react-redux';
import { RootState } from '../types';
import EmptySearchTable, {
  Props,
  Handlers
} from '../components/SearchTable/EmptySearchTable';
import { queryMturkAndTOpticon, FetchAction } from '../dispatch/fetchData';

const mapState = (state: RootState): Props => ({
  options: state.searchOptions
});

const mapDispatch = (dispatch: Dispatch<FetchAction>): Handlers => ({
  onFetch: queryMturkAndTOpticon(dispatch)
});

export default connect(mapState, mapDispatch)(EmptySearchTable);
