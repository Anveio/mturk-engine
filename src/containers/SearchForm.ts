import { connect, Dispatch } from 'react-redux';
import { RootState, SearchOptions } from '../types';
import { FormAction, updateForm } from '../actions/searchOptions';
import SearchForm, { Handlers } from '../components/Search/SearchForm';

const mapState = (state: RootState): SearchOptions => ({
  delay: state.searchOptions.delay,
  minReward: state.searchOptions.minReward,
  sortType: state.searchOptions.sortType,
  qualified: state.searchOptions.qualified
});

const mapDispatch = (dispatch: Dispatch<FormAction>): Handlers => ({
  onChange: (field: keyof SearchOptions, value: string | boolean) => {
    dispatch(updateForm(field, value));
  }
});

export default connect(mapState, mapDispatch)(SearchForm);
