import { connect, Dispatch } from 'react-redux';
import SearchForm, { Handlers } from '../components/SearchBar/SearchSettings';
import { SearchAction, searchRequestSingular } from '../actions/search';

const mapDispatch = (dispatch: Dispatch<SearchAction>): Handlers => ({
  onSearch: () => {
    dispatch(searchRequestSingular());
  }
});

export default connect(null, mapDispatch)(SearchForm);
