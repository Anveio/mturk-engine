import { connect, Dispatch } from 'react-redux';
import { RootState } from '../types';
import { FormAction, toggleForm } from '../actions/searchOptions';
import SearchContainer, {
  Props,
  Handlers
} from '../components/Search/SearchContainer';

const mapState = (state: RootState): Props => ({
  active: state.searchFormActive
});

const mapDispatch = (dispatch: Dispatch<FormAction>): Handlers => ({
  onToggle: () => {
    dispatch(toggleForm());
  }
});

export default connect(mapState, mapDispatch)(SearchContainer);
