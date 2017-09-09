import { connect } from 'react-redux';
import { RootState } from '../types';
import SearchTable, { Props } from '../components/SearchTable/SearchTable';

const mapState = (state: RootState): Props => ({
  hits: state.search,
  sortingOption: state.sortingOption,
  blockedHits: state.hitBlocklist,
  blockedRequesters: state.requesterBlocklist
});

export default connect(mapState)(SearchTable);
