import { connect, Dispatch } from 'react-redux';
import { RootState } from '../types';
import {
  toggleSearchActive,
  ToggleSearchActive
} from '../actions/searchActivity';
import { FormToggle, toggleForm } from '../actions/form';
import SearchButtons, {
  Props,
  Handlers
} from '../components/SearchBar/SearchButtons';

const mapState = (state: RootState): Props => ({
  searchActive: state.searchingActive,
  settingsActive: state.searchFormActive
});

type SearchBarButtonAction = FormToggle | ToggleSearchActive;

const mapDispatch = (dispatch: Dispatch<SearchBarButtonAction>): Handlers => ({
  onToggleSearch: () => dispatch(toggleSearchActive()),
  onToggleSettings: () => dispatch(toggleForm())
});

export default connect(mapState, mapDispatch)(SearchButtons);
