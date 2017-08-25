import { connect, Dispatch } from 'react-redux';
import { RootState, SearchOptions } from '../types';
import { FormAction, toggleForm } from '../actions/form';
import SearchBar, { Props, Handlers } from '../components/SearchBar/SearchBar';
import { SearchAction, searchRequest } from '../actions/search';

const mapState = (state: RootState): Props => ({
  active: state.searchFormActive,
  options: state.searchOptions
});

type SearchFormAction = FormAction | SearchAction;

const mapDispatch = (dispatch: Dispatch<SearchFormAction>): Handlers => ({
  onToggle: () => {
    dispatch(toggleForm());
  },
  onFetch: (options: SearchOptions) => dispatch(searchRequest(options))
});

export default connect(mapState, mapDispatch)(SearchBar);
