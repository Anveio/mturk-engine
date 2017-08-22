import { connect, Dispatch } from 'react-redux';
import { RootState } from '../types';
import { FormAction, toggleForm } from '../actions/form';
import SearchOptions, {
  Props,
  Handlers
} from '../components/SearchOptions/SearchOptions';
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

export default connect(mapState, mapDispatch)(SearchOptions);
