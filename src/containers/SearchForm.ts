import { connect, Dispatch } from 'react-redux';
import { RootState, SearchOptions } from '../types';
import { FormUpdate, updateForm } from '../actions/searchOptions';
import SearchForm, { Handlers } from '../components/SearchForm/SearchForm';

const mapState = (state: RootState): SearchOptions => ({
  delay: state.searchOptions.delay,
  minReward: state.searchOptions.minReward,
  sortType: state.searchOptions.sortType,
  qualified: state.searchOptions.qualified
});

const mapDispatch = (dispatch: Dispatch<FormUpdate>): Handlers => ({
  onChange: (field: keyof SearchOptions, value: string) => {
    dispatch(updateForm(field, value));
  }
});

export default connect(mapState, mapDispatch)(SearchForm);
