import { connect, Dispatch } from 'react-redux';
import { RootState, SearchOptions } from '../types';
import { SearchAction, searchRequest } from '../actions/search';
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
  onSearch: (options: SearchOptions) => dispatch(searchRequest(options)),
  onToggle: () => dispatch(toggleForm())
});

export default connect(mapState, mapDispatch)(SearchButtons);
