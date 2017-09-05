import { connect, Dispatch } from 'react-redux';
import { RootState, SearchOptions } from '../types';
import { FormAction, updateForm } from '../actions/form';
import SearchForm, {
  Props,
  Handlers
} from '../components/SearchBar/SearchSettings';
import { SearchAction, searchRequestSingular } from '../actions/search';

const mapState = (state: RootState): Props => ({
  searchOptions: {
    delay: state.searchOptions.delay,
    minReward: state.searchOptions.minReward,
    sortType: state.searchOptions.sortType,
    qualified: state.searchOptions.qualified
  },
  formActive: state.searchFormActive
});

type SearchSettingsAction = FormAction | SearchAction;

const mapDispatch = (dispatch: Dispatch<SearchSettingsAction>): Handlers => ({
  onChange: (field: keyof SearchOptions, value: string | boolean) => {
    dispatch(updateForm(field, value));
  },
  onSearch: () => {
    dispatch(searchRequestSingular());
  }
});

export default connect(mapState, mapDispatch)(SearchForm);
