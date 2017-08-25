import { connect, Dispatch } from 'react-redux';
import { RootState } from '../types';
import { QueueAction, fetchQueueRequest } from '../actions/queue';
import QueueTable, { Props, Handlers } from '../components/Queue/QueueTable';
// import { fetchQueue } from '../dispatch/fetchQueue';
import { returnHit } from '../dispatch/returnHit';

const mapState = (state: RootState): Props => ({
  queue: state.queue
});

const mapDispatch = (dispatch: Dispatch<QueueAction>): Handlers => ({
  onRefresh: () => dispatch(fetchQueueRequest()),
  onReturn: returnHit(dispatch)
});

export default connect(mapState, mapDispatch)(QueueTable);
