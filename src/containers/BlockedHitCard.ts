import { connect, Dispatch } from 'react-redux';
import SearchCard, {
  Props,
  OwnProps,
  Handlers
} from '../components/BlockList/BlockedHitCard';
import { RootState } from '../types';
import { BlockHitAction, unblockHitGroup } from '../actions/blockHitGroup';

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  blockedHit: state.hitBlocklist.get(ownProps.blockedHitId)
});

const mapDispatch = (dispatch: Dispatch<BlockHitAction>): Handlers => ({
  onUnblock: (groupId: string) => dispatch(unblockHitGroup(groupId))
});

export default connect(mapState, mapDispatch)(SearchCard);
