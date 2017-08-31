import { connect, Dispatch } from 'react-redux';
import { RootState, SearchOptions } from '../types';
import { SearchAction, searchRequest } from '../actions/search';
import { ScheduleAction, cancelNextSearch } from '../actions/scheduler';
import { toggleSearchActive } from '../actions/searchActivity';
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

type SearchBarButtonAction = FormAction | SearchAction | ScheduleAction;

const mapDispatch = (dispatch: Dispatch<SearchBarButtonAction>): Handlers => ({
  onToggleSearch: (options: SearchOptions, active: boolean) => {
    dispatch(toggleSearchActive());

    if (active) {
      console.log('Cancelling Search');
      dispatch(cancelNextSearch());
    } else {
      dispatch(searchRequest());
    }
  },
  onToggleSettings: () => dispatch(toggleForm())
});

export default connect(mapState, mapDispatch)(SearchButtons);
