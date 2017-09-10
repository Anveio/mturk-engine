import { connect } from 'react-redux';
import { RootState } from '../types';
import BlockList, { Props } from '../components/BlockList/BlockList';
import { hitBlocklistGroupIds } from '../selectors/hitBlocklist'

const mapState = (state: RootState): Props => ({
  blockedHitIds:  hitBlocklistGroupIds(state)
});

export default connect(mapState)(BlockList);
