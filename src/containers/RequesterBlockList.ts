import { connect } from 'react-redux';
import { RootState } from '../types';
import RequesterBlockList, {
  Props
} from '../components/BlockList/RequesterBlockList';
import { requesterBlocklistGroupIds } from '../selectors/requesterBlocklist';

const mapState = (state: RootState): Props => ({
  blockedRequesterIds: requesterBlocklistGroupIds(state)
});

export default connect(mapState)(RequesterBlockList);
