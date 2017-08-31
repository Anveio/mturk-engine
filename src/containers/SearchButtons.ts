import { connect, Dispatch } from 'react-redux';
import { RootState, SearchOptions } from '../types';
import { SearchAction, searchRequest } from '../actions/search';
import { toggleSearchActive } from '../actions/scheduler';
import { FormAction, toggleForm } from '../actions/form';
import SearchButtons, {
  Props,
  Handlers
} from '../components/SearchBar/SearchButtons';

const mapState = (state: RootState): Props => ({
  options: state.searchOptions,
  searchActive: state.searchingActive,
  settingsActive: state.searchFormActive
});

type SearchBarButtonAction = FormAction | SearchAction;

const mapDispatch = (dispatch: Dispatch<SearchBarButtonAction>): Handlers => ({
  onToggleSearch: (options: SearchOptions, active: boolean) => {
    dispatch(toggleSearchActive());

    if (active) {
      console.log('Cancelling Search');
    } else {
      console.log('Searching, and scheduling next search.');
      dispatch(searchRequest(options));
    }
  },
  onToggleSettings: () => dispatch(toggleForm())
});

export default connect(mapState, mapDispatch)(SearchButtons);
