import { RootState } from '../types';

import { connect } from 'react-redux';
import HitTable, { Props } from '../components/HitTable/HitTable';

// import { batchFetchTOpticon, selectRequesterId } from '../utils/turkopticon';

const mapState = (state: RootState): Props => ({
  hits: state.hits
});

export default connect(mapState)(HitTable);
