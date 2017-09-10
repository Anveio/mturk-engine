import { connect, Dispatch } from 'react-redux';
import { RootState } from '../types';
import SearchForm, {
  Props,
  Handlers
} from '../components/SearchBar/SearchSettings';
import { SearchAction, searchRequestSingular } from '../actions/search';

const mapState = (state: RootState): Props => ({
  formActive: state.searchFormActive
});

const mapDispatch = (dispatch: Dispatch<SearchAction>): Handlers => ({
  onSearch: () => {
    dispatch(searchRequestSingular());
  }
});

export default connect(mapState, mapDispatch)(SearchForm);
