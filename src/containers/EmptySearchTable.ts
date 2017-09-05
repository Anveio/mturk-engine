import { connect, Dispatch } from 'react-redux';
import EmptySearchTable, {
  Handlers
} from '../components/SearchTable/EmptySearchTable';
import { SearchAction, searchRequestSingular } from '../actions/search';

const mapDispatch = (dispatch: Dispatch<SearchAction>): Handlers => ({
  onSearch: () => dispatch(searchRequestSingular())
});

export default connect(null, mapDispatch)(EmptySearchTable);
