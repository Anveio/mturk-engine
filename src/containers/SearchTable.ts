import { connect } from 'react-redux';
import { RootState } from '../types';
import SearchTable, { Props } from '../components/SearchTable/SearchTable';
import { filteredResultsGroupId } from '../selectors/searchTable';

const mapState = (state: RootState): Props => ({
  resultsIds: filteredResultsGroupId(state)
});

export default connect(mapState)(SearchTable);
