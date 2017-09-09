import { connect, Dispatch } from 'react-redux';
import { BlockedRequester } from '../types';
import BlockActionsPopover, {
  Handlers
} from '../components/SearchTable/SearchCard/BlockActionsPopover';
import {
  BlockRequesterAction,
  blockRequester
} from '../actions/blockRequester';

const mapDispatch = (dispatch: Dispatch<BlockRequesterAction>): Handlers => ({
  onBlockRequester: (requester: BlockedRequester) => {
    dispatch(blockRequester(requester));
  }
});

export default connect(null, mapDispatch)(BlockActionsPopover);
