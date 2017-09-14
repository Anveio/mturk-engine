import { connect } from 'react-redux';
import { RootState } from '../types';
import RequesterBlockList, {
  Props
} from '../components/BlockList/RequesterBlockList';
import { recentlyBlockedRequesterIds } from '../selectors/requesterBlocklist';

const mapState = (state: RootState): Props => ({
  blockedRequesterIds: recentlyBlockedRequesterIds(state)
});

export default connect(mapState)(RequesterBlockList);
