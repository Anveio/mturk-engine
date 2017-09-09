import { connect } from 'react-redux';
import { RootState } from '../types';
import SearchTable, { Props } from '../components/SearchTable/SearchTable';
import { filteredResultsGroupIdSelector } from '../selectors/searchTable';

const mapState = (state: RootState): Props => ({
  resultsIds: filteredResultsGroupIdSelector(state),
});

export default connect(mapState)(SearchTable);
