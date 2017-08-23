import { connect, Dispatch } from 'react-redux';
import { RootState } from '../types';
import { FormAction, toggleForm } from '../actions/form';
import SearchBar, { Props, Handlers } from '../components/SearchBar/SearchBar';
import { queryMturkAndTOpticon, FetchAction } from '../dispatch/fetchData';

const mapState = (state: RootState): Props => ({
  active: state.searchFormActive,
  options: state.searchOptions
});

type SearchFormAction = FormAction | FetchAction;

const mapDispatch = (dispatch: Dispatch<SearchFormAction>): Handlers => ({
  onToggle: () => {
    dispatch(toggleForm());
  },
  onFetch: queryMturkAndTOpticon(dispatch)
});

export default connect(mapState, mapDispatch)(SearchBar);
