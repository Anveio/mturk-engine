import { connect, Dispatch } from 'react-redux';
import { RootState } from '../types';
import { FormAction, toggleForm } from '../actions/searchOptions';
import SearchForm, { Props, Handlers } from '../components/SearchForm/Search';

const mapState = (state: RootState): Props => ({
  active: state.searchFormActive
});

const mapDispatch = (dispatch: Dispatch<FormAction>): Handlers => ({
  onToggle: () => {
    dispatch(toggleForm());
  }
});

export default connect(mapState, mapDispatch)(SearchForm);
