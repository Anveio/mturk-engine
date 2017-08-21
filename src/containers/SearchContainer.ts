import { connect, Dispatch } from 'react-redux';
import { RootState } from '../types';
import { FormAction, toggleForm } from '../actions/searchOptions';
import SearchContainer, {
  Props,
  Handlers
} from '../components/SearchForm/SearchContainer';
import { queryMturkAndTOpticon, FetchAction } from '../requests/fetchData';

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

export default connect(mapState, mapDispatch)(SearchContainer);
