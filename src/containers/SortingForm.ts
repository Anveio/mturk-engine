import { connect, Dispatch } from 'react-redux';
import { ChangeSorting, changeSorting } from '../actions/sorting';
import { SortingOption, RootState } from '../types';
import SortingForm, {
  Props,
  Handlers
} from '../components/SearchTable/SortingForm';

const mapDispatch = (dispatch: Dispatch<ChangeSorting>): Handlers => ({
  onChange: (option: SortingOption) => {
    dispatch(changeSorting(option));
  }
});

const mapState = (state: RootState): Props => ({
  value: state.sortingOption
});

export default connect(mapState, mapDispatch)(SortingForm);
