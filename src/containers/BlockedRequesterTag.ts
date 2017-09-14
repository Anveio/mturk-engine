import { connect, Dispatch } from 'react-redux';
import SearchCard, {
  Props,
  OwnProps,
  Handlers
} from '../components/BlockList/BlockedRequesterTag';
import { RootState } from '../types';
import { UnblockRequester, unblockRequester } from '../actions/blockRequester';

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  requester: state.requesterBlocklist.get(ownProps.blockedRequesterId)
});

const mapDispatch = (dispatch: Dispatch<UnblockRequester>): Handlers => ({
  onUnblock: (id: string) => dispatch(unblockRequester(id))
});

export default connect(mapState, mapDispatch)(SearchCard);
