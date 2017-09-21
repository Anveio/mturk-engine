import { connect, Dispatch } from 'react-redux';
import { BlockedRequester } from '../types';
import BlockRequesterButton, {
  Handlers
} from '../components/SearchCard/BlockRequesterButton';
import {
  BlockRequesterAction,
  blockRequester
} from '../actions/blockRequester';

const mapDispatch = (dispatch: Dispatch<BlockRequesterAction>): Handlers => ({
  onBlockRequester: (requester: BlockedRequester) => {
    dispatch(blockRequester(requester));
  }
});

export default connect(null, mapDispatch)(BlockRequesterButton);
