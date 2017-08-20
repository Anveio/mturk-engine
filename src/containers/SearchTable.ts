import { connect, Dispatch } from 'react-redux';
import { RootState } from '../types';
import HitTable, { Props, Handlers } from '../components/SearchTable/SearchTable';
import { queryMturkAndTOpticon, FetchAction } from '../requests/fetchData';

const mapState = (state: RootState): Props => ({
  hits: state.search,
  requesters: state.requesters,
  options: state.searchOptions
});

const mapDispatch = (dispatch: Dispatch<FetchAction>): Handlers => ({
  onFetch: queryMturkAndTOpticon(dispatch),
  onAccept: (groupId: string) => console.log(groupId)
});

export default connect(mapState, mapDispatch)(HitTable);
