import { connect, Dispatch } from 'react-redux';
import EmptySearchTable, {
  Handlers
} from '../components/SearchTable/EmptySearchTable';
import { SearchAction, searchRequest } from '../actions/search';

const mapDispatch = (dispatch: Dispatch<SearchAction>): Handlers => ({
  onSearch: () => dispatch(searchRequest())
});

export default connect(null, mapDispatch)(EmptySearchTable);
