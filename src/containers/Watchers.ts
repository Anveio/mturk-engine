import { RootState } from '../types';
import { connect } from 'react-redux';
import Watchers, { Props } from '../components/Watchers/Watchers';
import { watcherIds } from '../selectors/watchers';

const mapState = (state: RootState): Props => ({
  watcherIds: watcherIds(state)
});

export default connect(mapState)(Watchers);
