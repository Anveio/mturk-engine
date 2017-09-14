import { connect } from 'react-redux';
import { RootState } from '../types';
import HitBlockList, { Props } from '../components/BlockList/HitBlockList';
import { recentlyBlockedHitIds } from '../selectors/hitBlocklist';

const mapState = (state: RootState): Props => ({
  blockedHitIds: recentlyBlockedHitIds(state)
});

export default connect(mapState)(HitBlockList);
