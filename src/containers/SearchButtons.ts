import { connect, Dispatch } from 'react-redux';
import { RootState } from '../types';
import { SearchAction, searchRequest } from '../actions/search';
import { toggleSearchActive } from '../actions/searchActivity';
import { FormAction, toggleForm } from '../actions/form';
import SearchButtons, {
  Props,
  Handlers
} from '../components/SearchBar/SearchButtons';

const mapState = (state: RootState): Props => ({
  searchActive: state.searchingActive,
  settingsActive: state.searchFormActive
});

type SearchBarButtonAction = FormAction | SearchAction;

const mapDispatch = (dispatch: Dispatch<SearchBarButtonAction>): Handlers => ({
  onToggleSearch: (active: boolean) => {
    dispatch(toggleSearchActive());

    if (!active) {
      dispatch(searchRequest());
    }
  },
  onToggleSettings: () => dispatch(toggleForm())
});

export default connect(mapState, mapDispatch)(SearchButtons);
