import { connect } from 'react-redux';
import { RootState } from '../types';
import HitBlockList, { Props } from '../components/BlockList/HitBlockList';
import { hitBlocklistGroupIds } from '../selectors/hitBlocklist';

const mapState = (state: RootState): Props => ({
  blockedHitIds: hitBlocklistGroupIds(state)
});

export default connect(mapState)(HitBlockList);
