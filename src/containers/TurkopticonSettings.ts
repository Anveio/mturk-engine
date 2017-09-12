import { connect } from 'react-redux';
import { RootState } from '../types';
import SearchForm, {
  Props
} from '../components/SearchBar/TurkopticonSettings/TurkopticonSettings';

const mapState = (state: RootState): Props => ({
  formActive: state.searchFormActive
});

export default connect(mapState)(SearchForm);
