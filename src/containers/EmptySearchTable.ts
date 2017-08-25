import { connect, Dispatch } from 'react-redux';
import { RootState, SearchOptions } from '../types';
import EmptySearchTable, {
  Props,
  Handlers
} from '../components/SearchTable/EmptySearchTable';
import { SearchAction, searchRequest } from '../actions/search';

const mapState = (state: RootState): Props => ({
  options: state.searchOptions
});

const mapDispatch = (dispatch: Dispatch<SearchAction>): Handlers => ({
  onFetch: (options: SearchOptions) => dispatch(searchRequest(options))
});

export default connect(mapState, mapDispatch)(EmptySearchTable);
