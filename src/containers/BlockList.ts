import { connect, Dispatch } from 'react-redux';
import { RootState } from '../types';
import { BlockHitAction, unblockHitGroup } from '../actions/blockHitGroup';
import BlockList, { Props, Handlers } from '../components/BlockList/BlockList';

const mapState = (state: RootState): Props => ({
  blockList: state.hitBlocklist
});

const mapDispatch = (dispatch: Dispatch<BlockHitAction>): Handlers => ({
  onUnblock: (groupId: string) => dispatch(unblockHitGroup(groupId))
});

export default connect(mapState, mapDispatch)(BlockList);
