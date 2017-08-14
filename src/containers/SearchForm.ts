import { connect, Dispatch } from 'react-redux';
import { RootState, SearchOptions } from '../types';
import { FormAction, updateForm, toggleForm } from '../actions/searchOptions';
import SearchForm, { Props, Handlers } from '../components/SearchForm/SearchForm';

const mapState = (state: RootState): Props => ({
  active: state.searchFormActive,
  delay: state.searchOptions.delay,
  minReward: state.searchOptions.minReward,
  sortType: state.searchOptions.sortType,
  qualified: state.searchOptions.qualified
});

const mapDispatch = (dispatch: Dispatch<FormAction>): Handlers => ({
  onChange: (field: keyof SearchOptions, value: string | boolean) => {
    dispatch(updateForm(field, value));
  },
  onToggle: () => {
    dispatch(toggleForm())
  }
});

export default connect(mapState, mapDispatch)(SearchForm);
