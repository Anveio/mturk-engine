import { connect, Dispatch } from 'react-redux';
import { RootState } from '../types';
import { toggleSearchActive, ToggleSearchActive } from '../actions/updateValue';

import SearchButtons, {
  Props,
  Handlers
} from '../components/SearchBar/SearchButtons';

const mapState = (state: RootState): Props => ({
  searchActive: state.searchingActive
});

const mapDispatch = (dispatch: Dispatch<ToggleSearchActive>): Handlers => ({
  onToggleSearch: () => dispatch(toggleSearchActive())
});

export default connect(mapState, mapDispatch)(SearchButtons);
