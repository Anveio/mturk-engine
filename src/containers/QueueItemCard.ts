import { connect, Dispatch } from 'react-redux';
import QueueItemCard, {
  Props,
  OwnProps,
  Handlers
} from '../components/Queue/QueueItemCard';
import { RootState } from '../types';
import { ReturnAction, returnHitRequest } from '../actions/return';

const mapState = (state: RootState, ownProps: OwnProps): Props => ({
  hit: state.queue.get(ownProps.hitId)
});

const mapDispatch = (dispatch: Dispatch<ReturnAction>): Handlers => ({
  onReturn: (hitId: string) => dispatch(returnHitRequest(hitId))
});

export default connect(mapState, mapDispatch)(QueueItemCard);
